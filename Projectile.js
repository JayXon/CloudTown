// Projectile
// - Goes forward
// - Dies when it hits something
// - Hurts whatever it crashes into
//
// Requires:
// - ...
//
// Authors: Frank DiCola, Sen Jiang, Slavik Turets


pc.script.create('Projectile', function (app) {

    // vars

    var Projectile = function (entity) {
        this.entity = entity;
    };

    Projectile.prototype = {

        initialize: function () {
            // console.log("Projectile... Initialized.");
            this.entity.collision.on('collisionstart', this.onCollisionStart, this);
        },

        update: function (dt) {
            // The destroy timer will tick down. When it depletes, destroy this object
        },

        onCollisionStart: function (result)
        {
            // Find the other's Damagable and adjust it's health
            if ( result.other.script && result.other.script.Damagable )
            {
                result.other.script.Damagable.adjustHealth( -25 );
            }
            else
                console.log("No Damagable detected");

            // TO DO: Start the destroy timer

            this.entity.destroy();
        }
    };

    return Projectile;
});