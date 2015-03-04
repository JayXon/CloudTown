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

            var topic = document.createElement('div');
            topic.id = 'topic';
            topic.style.color = 'gray';
            topic.style.padding = '8px';
            panel.appendChild(topic);

            var question = document.createElement('div');
            question.id = 'question';
            question.style.fontSize = '24px';
            question.style.padding = '8px';
            panel.appendChild(question);

            var answer = document.createElement('div');
            answer.id = 'answer';
            answer.style.padding = '4px 8px';
            panel.appendChild(answer);

            var cancelButton = document.createElement('button');
            cancelButton.innerHTML = 'Cancel';
            cancelButton.style.bottom = 0;
            cancelButton.style.right = 0;
            cancelButton.style.position = 'absolute';
            cancelButton.style.margin = '16px';
            cancelButton.onclick = this.closePanel;
            panel.appendChild(cancelButton);

            document.querySelector('body').appendChild(panel);
            // this.generate();
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        },

        present: function (data) {
            console.log(data);

            document.querySelector('#topic').innerHTML = data[0].topic;
            document.querySelector('#question').innerHTML = data[0].question;
            document.querySelector('#answer').innerHTML = data[0].correctAnswer;

            document.querySelector('#panel').style.visibility = 'visible';

            if ( pc.input.Mouse.isPointerLocked() )
            {
                app.mouse.disablePointerLock();
            }
        },

        closePanel : function () {
            document.querySelector('#panel').style.visibility = 'hidden';
            app.mouse.enablePointerLock();
        },

        isPanelVisible : function () {
            return document.querySelector('#panel').style.visibility === 'visible';
        },

        generate: function () {
            this.Client.getQuestion();
        }
    };

    return Question;
});