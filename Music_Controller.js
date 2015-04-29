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

            // this.entity.audiosource.loop = false;
        },

        update: function (dt) {
        },

        switchSong: function ( state ) {
            if ( state === 0 )
                this.entity.audiosource.play("MainMenu");
            else if ( state === 1 )
                this.entity.audiosource.play("In-Game");
            else if ( state === 2 )
                this.entity.audiosource.play("GuitarSong");
        }
    };

    return Music_Controller;
});