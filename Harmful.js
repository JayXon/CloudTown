// Harmful
// - Uses its collision box to hurt whatever it touches

//
// Requires:
// - ...
//
// Authors: Frank DiCola, Sen Jiang, Slavik Turets

pc.script.attribute("damageAmount", "number", 10, {displayName: "Damage"}); // Running speed

pc.script.create('Harmful', function (app) {

    var Harmful = function (entity) {
        this.entity = entity;
    };

    Harmful.prototype = {

        initialize: function () {
            console.log("Harmful... Initialized at " + this.damageAmount + " damage.");
            this.entity.collision.on('collisionstart', this.onCollisionStart, this);
        },

        update: function (dt) {
        },

        onCollisionStart: function (result)
        {
            // Find the other's Damagable and adjust it's health
            if ( result.other.script && result.other.script.Damagable )
            {
                result.other.script.Damagable.adjustHealth( this.damageAmount );
                console.log("HAHA! YOU'VE BEEN HARMED BY ME, " + this.entity.name + " FOR " + this.damageAmount + " HITPOINTS!!!!");
            }
            else
                console.log("No Damagable detected");
        }
    };

    return Harmful;
});