// User Interface
// - mgmgmg
//
// Requires:
// - ...
//
// Authors: Frank DiCola, Sen Jiang, Slavik Turets


pc.script.create('User_Interface', function (context) {

    var User_Interface = function (entity) {
        this.entity = entity;
        this.currentHP = "99999";
    };

    User_Interface.prototype = {

        initialize: function () {
            console.log("User_Interface... Initialized.");
            
            var healthDisplay = document.createElement('div');
            healthDisplay.id = 'HP';
            healthDisplay.style.top = '10 px';
            healthDisplay.style.margin = '30 px';
            healthDisplay.style.padding = '8px';
            healthDisplay.style.zIndex = 1000;
            healthDisplay.style.visibility = 'visible';
            healthDisplay.style.position = 'relative';
            healthDisplay.style.color = '#FFFFFF';

            document.querySelector('body').appendChild(healthDisplay);
            
            // Set initial values
            this.setHealthDisplay( 50 );
        },

        update: function (dt) {
        },
        
        setHealthDisplay : function ( hp ) {
            document.getElementById('HP').innerHTML = "Health: " + hp;
        }

    };

    return User_Interface;
});