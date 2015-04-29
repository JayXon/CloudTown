// Music
// - Change between the songs of the game
//
// Requires:
// - ...
//
// Authors: Frank DiCola, Sen Jiang, Slavik Turets

pc.script.create('Music_Controller', function (app) {

    var Music_Controller = function (entity) {
        this.entity = entity;
    };

    Music_Controller.prototype = {

        initialize: function () {
            console.log("Music_Controller... Initialized.");

            
        },

        update: function (dt) {
        }
    };

    return Music_Controller;
});