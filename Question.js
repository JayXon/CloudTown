// Question
// - Retrieves a Question for the Player
// - Handles Mouse Input
//
// Requires:
// - Connection to Database
//
// Authors: Frank DiCola, Sen Jiang, Slavik Turets

pc.script.create('Question', function (app)
{
    // Creates a new Question instance
    var Question = function (entity) {
        this.entity = entity;
        this.targetPlayer;
        this.correct;
    };

    Question.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function ()
        {
            console.log("Question... Initialized.");

            this.Client = app.root.getChildren()[0].script.Client;

            var panel = document.createElement('div');
            panel.id = 'panel';
            /*
            panel.style.top = '10%';
            panel.style.height = '75%';
            panel.style.width = '800px';
            panel.style.margin = 'auto';
            panel.style.zIndex = 999;
            panel.style.visibility = 'hidden';
            panel.style.position = 'relative';
            panel.style.color = '#DAA520';
            panel.style.backgroundColor = 'rgba(0,0,0,0.8)';
            panel.style.boxShadow = '6px 12px 14px 2px rgba(0,0,0,0.64)';
            */
            panel.className = 'ui modal';

            var header = document.createElement('div');
            header.className = 'header';
            var question = document.createElement('div');
            question.id = 'question';
            question.className = 'content';
            header.appendChild(question);
            panel.appendChild(header);

            var answer = document.createElement('div');
            answer.id = 'answer';
            answer.className = 'content';
            //answer.style.padding = '4px 8px';
            panel.appendChild(answer);

            var closeButton = document.createElement('i');
            closeButton.className = "close icon";
            closeButton.onclick = this.closePanel.bind(this);
            panel.appendChild(closeButton);
/*
            var closeButton = document.createElement('button');
            closeButton.id = 'close'
            closeButton.innerHTML = 'X';
            closeButton.style.top = 0;
            closeButton.style.right = 0;
            closeButton.style.position = 'absolute';
            closeButton.style.margin = '16px';
            closeButton.onclick = this.closePanel.bind(this);
            panel.appendChild(closeButton);
*/
            var actionsDiv = document.createElement('div');
            actionsDiv.className = 'actions';

            var hintButton = document.createElement('div');
            hintButton.id = 'hint'
            hintButton.className = 'ui button';
            hintButton.innerHTML = 'Hint';
            /*
            hintButton.style.bottom = 0;
            hintButton.style.right = '80px';
            hintButton.style.position = 'absolute';
            hintButton.style.margin = '16px';
            */
            hintButton.onclick = this.hint.bind(this);
            actionsDiv.appendChild(hintButton);

            var submitButton = document.createElement('div');
            submitButton.id = 'submit'
            submitButton.className = 'ui right primary button';
            submitButton.innerHTML = 'Submit';
            /*
            submitButton.style.bottom = 0;
            submitButton.style.right = 0;
            submitButton.style.position = 'absolute';
            submitButton.style.margin = '16px';
            */
            submitButton.onclick = this.submit.bind(this);
            actionsDiv.appendChild(submitButton);

            panel.appendChild(actionsDiv);

            document.querySelector('body').appendChild(panel);
        },

        update: function (dt) {
        },

        present: function (data) {
            console.log(data);
            this.data = data;

            document.getElementById('question').innerHTML = data.question;

            document.getElementById('question').appendChild(document.createElement('br'));
            var title = document.createElement('div');
            title.id = 'title';
            title.className = 'ui label';
            title.innerHTML = data.title;
            document.getElementById('question').appendChild(title);

            var answer_div = document.getElementById('answer');
            answer_div.innerHTML = "";

            data.answers.forEach(function(answer) {
                var checkbox = document.createElement('div');
                checkbox.className = 'ui checkbox';
                var input = document.createElement('input');
                input.type = 'checkbox';
                checkbox.appendChild(input);
                var label = document.createElement('label');
                /*
                label.style.width = '720px';
                label.style.margin = '6px';
                label.style.display = 'block';*/
                label.innerHTML = answer;
                checkbox.appendChild(label);
                //label.insertBefore(checkbox, label.childNodes[0]);
                answer_div.appendChild(checkbox);

                var divider = document.createElement('div');
                divider.className = 'ui hidden divider';
                answer_div.appendChild(divider);
            });

            $('.ui.checkbox').checkbox();

            // hide or show hint button
            if (data.hint.length !== 0) {
                document.getElementById('hint').style.visibility = 'inherit';
            } else {
                document.getElementById('hint').style.visibility = 'hidden';
            }

            // if the player is dead disable close button before submit
            if ( this.targetPlayer.script.Character_Controller.gameState === 2 )
                $('#panel').modal('setting', 'closable', false);
            else
                $('#panel').modal('setting', 'closable', true);
            // enable submit button
            document.getElementById('submit').disabled = false;

            // document.getElementById('panel').style.visibility = 'visible';
            $('#panel').modal({
                onHide : this.closePanel.bind(this),
                onApprove : function() {
                    alert('Approved!');
                    return false;
                }
            });
            $('#panel').modal('show');

            // unlock mouse
            if ( pc.input.Mouse.isPointerLocked() )
            {
                app.mouse.disablePointerLock();
            }
        },

        submit : function () {
            // send the index of selected answers to server
            var selected = [];
            var checkboxes = document.getElementById('answer').childNodes;
            for (var i = 0; i*2 < checkboxes.length; i++) {
                if (checkboxes[i*2].firstChild.checked) {
                    selected.push(i);
                }
            }
            this.Client.send('submit_answer', selected);

            // document.getElementById('close').disabled = false;
            // disable submit button
            document.getElementById('submit').disabled = true;
            
            this.correct = true;
        },

        hint : function () {
            alert(this.data.hint);
        },

        feedback : function (data) {
            // alert(data.correct);
            // this.closePanel();

            var checkboxes = document.getElementById('answer').childNodes;
            if (data.length === 0) {
                // the answers are correct!
                var label = document.createElement('label');
                label.style.color = 'green';
                label.innerHTML = 'Correct!'
                document.getElementById('answer').appendChild(label);
                this.reward();
            } else {
                // the answers are wrong :(
                // mark the wrong answers as red
                data.forEach(function(i) {
                    checkboxes[i].style.color = '#fff';
                    
                    if ( checkboxes[i*2].firstChild.checked === true )
                        checkboxes[i*2].style.backgroundColor = 'red';
                    else
                        checkboxes[i*2].style.backgroundColor = 'green';
                });
                
                this.correct = false;
                // this.punish();
            }
        },
        
        reward : function () {
            
            // If they are dead, respawn them
            if ( this.targetPlayer.script.Character_Controller.gameState === 2 ) {
                alert("Welcome back!");
                this.targetPlayer.script.Character_Controller.spawn();
            }

            // Else, sparkly particles
            // spawn some thing at the box
            
            
            $('#panel').modal('hide');
            // No matter what, close the panel!
            //this.closePanel();
        },

        closePanel : function () {
            // If they are dead and got it wrong, get a new question
            if ( this.correct === false && this.targetPlayer.script.Character_Controller.gameState === 2 ) {
                this.generate(this.targetPlayer, -1);
                return;
            }

            //document.getElementById('panel').style.visibility = 'hidden';
            app.mouse.enablePointerLock();

            // Let the Player move again
            this.targetPlayer.script.Player_Input.unlockInput();
            this.targetPlayer.script.Third_Person_Camera.unlockInput();

            console.log(this.targetPlayer.name + " should be able to move now.");
        },

        isPanelVisible : function () {
            return document.getElementById('panel').style.visibility === 'visible';
        },

        generate: function ( player, id ) {

            this.targetPlayer = player;
            console.log("WHOOOOOOOO " + this.targetPlayer.name + " hit TreasureBox " + id);

            if ( true || !this.isPanelVisible() ) {
                this.Client.send('new_question', id);
            }
        }
    };

    return Question;
});