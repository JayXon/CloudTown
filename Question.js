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
            var panel = document.createElement('div');
            panel.id = 'question';
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

            document.querySelector('body').appendChild(panel);
            // this.generate();
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        },

        present: function (question) {
            var panel = document.querySelector('#question');
            panel.innerHTML = question[0].question;
            panel.style.visibility = 'visible';
            console.log(question);
        },

        generate: function () {
            // TO DO: Retrieve question from database
            app.root.getChildren()[0].script.Client.getQuestion();
        }
    };

    return Question;
});