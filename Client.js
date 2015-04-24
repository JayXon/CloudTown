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
            this.socket = io('http://ssw800.jayxon.com:40500');
            var question = this.entity.script.Question;
            this.socket.on('question_received', question.present.bind(question));
            this.socket.on('answer_received', question.feedback.bind(question));

            var network_manager = this.entity.script.Network_Manager;
            this.socket.on('player_joined', network_manager.newPlayer.bind(network_manager));
            this.socket.on('player_quit', network_manager.deletePlayer);
            this.socket.on('player_moved', network_manager.movePlayer);
            this.socket.on('Create TB', network_manager.newTreasury);
            this.socket.on('Delete TB', network_manager.deleteTreasury);
            this.socket.on('shoot', network_manager.playerAttack);
            this.socket.on('health', network_manager.playerHealth.bind(network_manager));
            this.socket.on('bullets', network_manager.playerBullets.bind(network_manager));
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        },

        send : function (msg, data) {
            this.socket.emit(msg, data);
        }
    };

    return Client;
});