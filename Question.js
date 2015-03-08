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
    };

    Question.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function ()
        {
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
            closeButton.onclick = this.closePanel;
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
            // this.generate();
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        },

        present: function (data) {
            // prevent panel from changing question
            if (this.isPanelVisible()) {
                return;
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
                label.innerHTML = answer + '<br/>';

                label.insertBefore(checkbox, label.childNodes[0]);
                answer_div.appendChild(label);
            });

            if (data.hint.length !== 0) {
                document.getElementById('hint').style.visibility = 'visible';
            } else {
                document.getElementById('hint').style.visibility = 'hidden';
            }

            document.getElementById('panel').style.visibility = 'visible';


            if ( pc.input.Mouse.isPointerLocked() )
            {
                app.mouse.disablePointerLock();
            }
        },

        submit : function () {
            var submit_data = {
                id : this.data.id,
                answers : this.data.answers,
                selected : []
            }
            var checkboxes = document.getElementById('answer').childNodes;
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].firstChild.checked) {
                    submit_data.selected.push(i);
                }
            }
            this.Client.send('submit_answer', submit_data);
        },

        hint : function () {
            alert(this.data.hint);
        },

        feedback : function (data) {
            alert(data.correct);
            this.closePanel();
        },

        closePanel : function () {
            document.getElementById('panel').style.visibility = 'hidden';
            app.mouse.enablePointerLock();
        },

        isPanelVisible : function () {
            return document.getElementById('panel').style.visibility === 'visible';
        },

        generate: function () {
            if (!this.isPanelVisible()) {
                this.Client.send('new_question');
            }
        }
    };

    return Question;
});