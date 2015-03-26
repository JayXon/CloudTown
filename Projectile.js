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
            console.log("Projectile... Initialized.");
            this.entity.collision.on('collisionstart', this.onCollisionStart, this);

        },

        update: function (dt) {
        },
        
        onCollisionStart: function (result)
        {
            console.log("Ping!");
            this.entity.destroy();
        }
    };

    return Projectile;
});