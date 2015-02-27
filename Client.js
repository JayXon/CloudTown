// Client
// - Access the server
//
// Requires:
// - socket.io-1.3.4.js
//
// Authors: Frank DiCola, Sen Jiang, Slavik Turets

pc.script.create('Client', function (app)
{
    // Creates a new Client instance
    var Client = function (entity) {
        this.entity = entity;
    };

    Client.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            var socket = io('http://ssw800.jayxon.com:40500');

            socket.io('question_received', function(data) {
                this.entity.script.Question.present(data);
            })
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        },

        getQuestion: function () {
            socket.emit('new_question');
        }
    };

    return Client;
});