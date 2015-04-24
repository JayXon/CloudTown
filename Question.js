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
            answer.className = 'ui content form';
            panel.appendChild(answer);

            var closeButton = document.createElement('i');
            closeButton.className = "close icon";
            closeButton.onclick = this.closePanel.bind(this);
            panel.appendChild(closeButton);

            var actionsDiv = document.createElement('div');
            actionsDiv.className = 'actions';

            var hintButton = document.createElement('div');
            hintButton.id = 'hint'
            hintButton.className = 'ui approve button';
            hintButton.innerHTML = 'Hint';
            hintButton.onclick = this.hint.bind(this);
            actionsDiv.appendChild(hintButton);

            var submitButton = document.createElement('div');
            submitButton.id = 'submit'
            submitButton.className = 'ui right approve primary button';
            submitButton.innerHTML = 'Submit';
            submitButton.onclick = this.submit.bind(this);
            actionsDiv.appendChild(submitButton);

            panel.appendChild(actionsDiv);

            document.querySelector('body').appendChild(panel);
        },

        update: function (dt) {
        },

        present: function (data) {
            console.log(data);
            console.log("present function");
            this.data = data;
            
            document.getElementById('question').innerHTML = data.question;
             
             console.log("multiple choice questions");
            document.getElementById('question').appendChild(document.createElement('br'));
            var title = document.createElement('div');
            title.id = 'title';
            title.className = 'ui label';
            title.innerHTML = data.title;
            document.getElementById('question').appendChild(title);

            var answer_div = document.getElementById('answer');
            answer_div.innerHTML = "";

            if (data.type === 0){
            data.answers.forEach(function(answer) {
                var checkbox = document.createElement('div');
                checkbox.className = 'ui checkbox';

                var input = document.createElement('input');
                input.type = 'checkbox';
                checkbox.appendChild(input);

                var label = document.createElement('label');
                label.innerHTML = answer;
                checkbox.appendChild(label);

                answer_div.appendChild(checkbox);

                var divider = document.createElement('div');
                divider.className = 'ui hidden divider';
                answer_div.appendChild(divider);
                });

                // initialize checkbox
                $('.ui.checkbox').checkbox();


             } else { 

                   //data.answers.forEach(function(answer) {
                   //var checkbox = document.createElement('div');
                   //checkbox.className = 'ui checkbox';

                    var input = document.createElement('div');
                    input.id = 'input';
                    input.className = 'ui input';
                    input.innerHTML = "<input type= \"text\" placeholder = \"Answer\">"; 
                    answer_div.appendChild(input);

                   //var label = document.createElement('label');
                   //label.innerHTML = answer;
                   //checkbox.appendChild(label);

                   //answer_div.appendChild(checkbox);

                   var divider = document.createElement('div');
                   divider.className = 'ui hidden divider';
                   answer_div.appendChild(divider);
               }           
                // hide or show hint button
                if (data.hint.length !== 0) {
                document.getElementById('hint').style.visibility = 'inherit';
                } else {
                document.getElementById('hint').style.visibility = 'hidden';
                }

                // enable submit button
               $('#submit').removeClass('disabled');
               // Hide close button if player is dead
               if (this.targetPlayer.script.Character_Controller.gameState === 2)
                $('#panel>.close').hide();

               // document.getElementById('panel').style.visibility = 'visible';
               $('#panel').modal({
                closable  : this.targetPlayer.script.Character_Controller.gameState !== 2,
                onHide : this.closePanel.bind(this),
                onApprove : function() {
                    return false;
                }
               }).modal('show');

            // unlock mouse
            if ( pc.input.Mouse.isPointerLocked() )
                app.mouse.disablePointerLock();
              
        },

        submit : function () {
            // send the index of selected answers to server
            var selected = [];
            
            if (this.data.type === 0){
            
            var checkboxes = document.getElementById('answer').childNodes;
            for (var i = 0; i*2 < checkboxes.length; i++) {
                if (checkboxes[i*2].firstChild.checked) {
                    selected.push(i);
                }
            }
            this.Client.send('submit_answer', selected);
            } 
            else{
                 var answer = document.getElementById('input').childNodes[0].value;
                 console.log(answer);
                 this.Client.send('submit_answer', answer);
            }
            // disable submit button
            $('#submit').addClass('disabled');
            // Show close button
            $('#panel>.close').show();
            
            this.correct = true;
        },

        hint : function () {
            alert(this.data.hint);
        },

        feedback : function (data) {

            var checkboxes = document.getElementById('answer').childNodes;
             console.log(data);
            if (this.data.type === 0){
            if (data.length === 0) {
                // the answers are correct!
               
                this.reward();
            } else {
                // the answers are wrong :(
                // mark the wrong answers as red
                data.forEach(function(i) {
                    
                    if ( checkboxes[i*2].firstChild.checked === true )
                        $(checkboxes[i*2]).wrap('<div class="ui negative message"></div>');
                    else
                        $(checkboxes[i*2]).wrap('<div class="ui positive message"></div>');
                });
                
                this.correct = false;
                // this.punish();
            }
           }

           if (this.data.type === 1){
            if (data.length === 0) {
                // the answers are correct!
               
                this.reward();
            } else {
                // the answers are wrong :(
                // mark the wrong answers as red
                var answer = document.getElementById('input').childNodes[0];
                $(answer).wrap('<div class="ui negative message"></div>');
                //$(checkboxes[i*2]).wrap('<div class="ui positive message"></div>');
                var answer_div = document.getElementById('answer');
                var correct_ans = document.createElement('div');
                correct_ans.className = 'ui green message';
                correct_ans.innerHTML = data; 
                answer_div.appendChild(correct_ans);  
                
                this.correct = false;
                // this.punish();
            }
           }
        },
        
        reward : function () {
            
            // If they are dead, respawn them
            if ( this.targetPlayer.script.Character_Controller.gameState === 2 ) {
                // alert("Welcome back!");
                this.targetPlayer.script.Character_Controller.spawn();
            }

            // Else, sparkly particles
            // spawn some thing at the box
            
            
            // No matter what, close the panel!
            $('#panel').modal('hide');
        },

        closePanel : function () {
            // If they are dead and got it wrong, get a new question
            if ( this.correct === false && this.targetPlayer.script.Character_Controller.gameState === 2 ) {
                this.generate(this.targetPlayer, -1);
                return;
            }

            app.mouse.enablePointerLock();

            // Let the Player move again
            this.targetPlayer.script.Player_Input.unlockInput();
            this.targetPlayer.script.Third_Person_Camera.unlockInput();

            // console.log(this.targetPlayer.name + " should be able to move now.");
        },

        generate: function ( player, id ) {
            this.targetPlayer = player;
            // console.log("WHOOOOOOOO " + this.targetPlayer.name + " hit TreasureBox " + id);

            this.Client.send('new_question', id);
        }
    };

    return Question;
});