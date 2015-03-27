// Damagable
// - Has Health Points
// - Receives Damage
// - Sends the command to the parent to "Die"
//
// Requires:
// - ...
//
// Authors: Frank DiCola


pc.script.create('Damagable', function (app) {

    var Damagable = function (entity) {
        this.entity = entity;
        this.currentHealth = 50;
        this.maxHealth = 50;
    };

    Damagable.prototype = {

        initialize: function () {
            console.log("Damagable... Initialized.");
            this.User_Interface = app.root.getChildren()[0].script.User_Interface;
        },

        update: function (dt) {
        },

        // This function can either heal the target
        // or deplete its Health Points
        adjustHealth: function ( amount ) {
            this.currentHealth += amount;

            if ( this.currentHealth <= 0 ) {
                this.currentHealth = 0;
                this.die();
            }

            // If this is a Player, update the HTML Graphics thing with current health
            if ( this.entity.name === "Player" )
                this.User_Interface.setHealthDisplay( this.currentHealth );

            console.log("Health remaining: " + this.currentHealth);
        },

        die : function () {
            
            console.log(this.entity.name + " died.");

            // You died...
            if ( this.entity.name.slice(0, 6) === "Player" ) {
                // We trust that we have a Character Controller!
                this.entity.script.Character_Controller.die();
            } else {
                this.entity.destroy();
            }
        }
    };

    return Damagable;
});