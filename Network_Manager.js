// Network Manager
// - Handle logging in
// - Spawn your Player in a random position
//
// Requires:
// - Nothing
//
// Authors: Frank DiCola, Sen Jiang, Slavik Turets


pc.script.create('Network_Manager', function (context) {

    var Network_Manager = function (entity) {
        this.entity = entity;
    };

    Network_Manager.prototype = {

        initialize: function () {
            console.log("Network_Manager... Initialized.");
        },

        update: function (dt) {
        }
    };

    return Network_Manager;
});