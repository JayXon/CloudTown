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

            var title = document.createElement('div');
            title.id = 'title';
            title.style.color = 'gray';
            title.style.padding = '8px';
            panel.appendChild(title);

            var question = document.createElement('div');
            question.id = 'question';
            question.style.fontSize = '24px';
            question.style.padding = '8px';
            panel.appendChild(question);

            var answer = document.createElement('div');
            answer.id = 'answer';
            answer.style.padding = '4px 8px';
            panel.appendChild(answer);

            var closeButton = document.createElement('button');
            closeButton.innerHTML = 'X';
            closeButton.style.top = 0;
            closeButton.style.right = 0;
            closeButton.style.position = 'absolute';
            closeButton.style.margin = '16px';
            closeButton.onclick = this.closePanel.bind(this);
            panel.appendChild(closeButton);

            var hintButton = document.createElement('button');
            hintButton.id = 'hint'
            hintButton.innerHTML = 'Hint';
            hintButton.style.bottom = 0;
            hintButton.style.right = '80px';
            hintButton.style.position = 'absolute';
            hintButton.style.margin = '16px';
            hintButton.onclick = this.hint.bind(this);
            panel.appendChild(hintButton);

            var submitButton = document.createElement('button');
            submitButton.id = 'submit'
            submitButton.innerHTML = 'Submit';
            submitButton.style.bottom = 0;
            submitButton.style.right = 0;
            submitButton.style.position = 'absolute';
            submitButton.style.margin = '16px';
            submitButton.onclick = this.submit.bind(this);
            panel.appendChild(submitButton);

            document.querySelector('body').appendChild(panel);
        },

        update: function (dt) {
        },

        present: function (data) {
            // prevent panel from changing question
            if (this.isPanelVisible()) {
                // return;
            }

            console.log(data);
            this.data = data;

            document.getElementById('title').innerHTML = data.title;
            document.getElementById('question').innerHTML = data.question;
            var answer_div = document.getElementById('answer');
            answer_div.innerHTML = "";

            data.answers.forEach(function(answer) {
                var label = document.createElement('label');
                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                label.style.width = '720px';
                label.style.margin = '6px';
                label.style.display = 'block';
                label.innerHTML = answer + '<br/>';

                label.insertBefore(checkbox, label.childNodes[0]);
                answer_div.appendChild(label);
            });

            // hide or show hint button
            if (data.hint.length !== 0) {
                document.getElementById('hint').style.visibility = 'inherit';
            } else {
                document.getElementById('hint').style.visibility = 'hidden';
            }

            // enable submit button
            document.getElementById('submit').disabled = false;

            document.getElementById('panel').style.visibility = 'visible';

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
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].firstChild.checked) {
                    selected.push(i);
                }
            }
            this.Client.send('submit_answer', selected);
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
                    
                    if ( checkboxes[i].firstChild.checked === true )
                        checkboxes[i].style.backgroundColor = 'red';
                    else
                        checkboxes[i].style.backgroundColor = 'green';
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
            
            
            // No matter what, close the panel!
            this.closePanel();
        },

        closePanel : function () {
            // If they are dead and got it wrong, get a new question
            if ( this.correct === false && this.targetPlayer.script.Character_Controller.gameState === 2 ) {
                this.generate(this.targetPlayer, -1);
                return;
            }

            document.getElementById('panel').style.visibility = 'hidden';
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