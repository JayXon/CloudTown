// Harmful
// - Uses its collision box to hurt whatever it touches

//
// Requires:
// - ...
//
// Authors: Frank DiCola, Sen Jiang, Slavik Turets


pc.script.create('Harmful', function (app) {

    var Harmful = function (entity) {
        this.entity = entity;
        this.damage = -200;
    };

    Harmful.prototype = {

        initialize: function () {
            console.log("Harmful... Initialized.");
            this.entity.collision.on('collisionstart', this.onCollisionStart, this);
        },

        update: function (dt) {
        },

        onCollisionStart: function (result)
        {
            // Find the other's Damagable and adjust it's health
            if ( result.other.script && result.other.script.Damagable )
            {
                result.other.script.Damagable.adjustHealth( this.damage );
                console.log("HAHA! YOU'VE BEEN HARMED BY ME, " + this.entity.name + " FOR " + this.damage + " HITPOINTS!!!!");
            }
            else
                console.log("No Damagable detected");
        }
    };

    return Harmful;
});