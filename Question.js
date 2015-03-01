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
            // this.generate();
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        },

        present: function (question) {
            console.log(question);
        },

        generate: function () {
            // TO DO: Retrieve question from database
            app.root.getChildren()[0].script.Client.getQuestion();
        }
    };

    return Question;
});