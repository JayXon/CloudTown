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

    // vars

    var Damagable = function (entity) {
        this.entity = entity;
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

        }
    };

    return Damagable;
});