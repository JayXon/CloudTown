// Damagable
// - Has Health Points
// - Receives Damage
// - Sends the command to the parent to "Die"
//
// Requires:
// - ...
//
// Authors: Frank DiCola


pc.script.create('Damagable', function (context) {

    var Damagable = function (entity) {
        this.entity = entity;
        this.currentHealth = 50;
        this.maxHealth = 50;
    };

    Damagable.prototype = {

        initialize: function () {
            console.log("Damagable... Initialized.");
        },

        update: function (dt) {
        },

        // This function can either heal the target
        // or deplete its Health Points
        adjustHealth: function () {
            this.currentHealth -= 5;
            
            if ( this.currentHealth <= 0 ) {
                this.currentHealth = 0;
                this.entity.destroy();
            }
            
            console.log("Health remaining: " + this.currentHealth);
        }
    };

    return Damagable;
});