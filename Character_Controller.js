// pc.script.attribute("moveSpeed", "number", 10, {displayName: "Move Speed"}); // Running speed

// Character Controller
// - Move the player, play animations, handle death and respawning
//
// Requires:
// - Nothing
//
// Authors: Frank DiCola


pc.script.create('Character_Controller', function (app) {

    var groundCheckRay = new pc.Vec3(0, -6.5, 0);      // > 5.78
    var rayEnd = new pc.Vec3();
    var shootRayEnd = new pc.Vec3();

    // Creates a new Character_Controller instance
    var Character_Controller = function (entity) {
        this.entity = entity;
        this.onGround = false;

        this.moveSpeed = 30;
    };

    Character_Controller.prototype = {

        initialize: function () {
            console.log("Character_Controller... Initialized.");

            this.camera_script = this.entity.script.Third_Person_Camera;
        },

        update: function (dt) {
            this._checkGround();
        },
        
        // Attack with the equipped weapon in the direction
        // the character is facing.
        attack: function ()
        {
            // console.log("Shoot: " + this.entity.forward.toString());
            
            // Cast a ray
            var self = this;
            var pos = self.entity.getPosition();
            
            // Vinnie says that shootRayEnd should be
            // the forward vector * (distance + posVector)
            // shootRayEnd.mul(self.entity.forward, pos);

            // shootRayEnd.add2(pos, self.entity.forward);
            var y_redian = this.camera_script.ey/180*Math.PI;
            shootRayEnd.x = Math.sin(y_redian);
            shootRayEnd.z = Math.cos(y_redian);
            shootRayEnd.scale(1000000);

            /*app.systems.rigidbody.raycastFirst(pos, shootRayEnd, function(result)
            {
                // Spawn a box
                var spawnedBox = new pc.Entity();
                spawnedBox.addComponent("model", { type: 'box', });
                app.root.addChild(spawnedBox);
                spawnedBox.setPosition(result.point);
                spawnedBox.setLocalScale(5, 5, 5);
            });*/
            
            var projectile = new pc.Entity();
            projectile.setPosition( pos.add2(pos, new pc.Vec3(Math.sin(y_redian) * 5, 5, Math.cos(y_redian) * 5) ) );
            projectile.setLocalScale( 3, 3, 3 );
            projectile.addComponent("model", { type: 'sphere', });
            projectile.addComponent("collision", { type: 'sphere', radius: 1.5, });
            projectile.addComponent("rigidbody", { type: 'dynamic', });
            projectile.rigidbody.applyForce( Math.sin(y_redian) * 20000, 0, Math.cos(y_redian) * 20000 );
            app.root.addChild(projectile);
            app.systems.script.addComponent(projectile, {
                scripts : [{
                    url : 'Projectile.js'
                }]
            });


        },

        // Move the character in the direction supplied
        move: function (direction) {
            if ( this.onGround && !this.isControlLocked ) {
                direction.scale(this.moveSpeed);
                this.entity.rigidbody.linearVelocity = direction;
            }
        },
        
        slow: function () {
            // alert("sloooow dowoooonw");
            this.entity.rigidbody.linearVelocity = new pc.Vec3(0, 0, 0);
        },

        _checkGround: function () {
            var self = this;
            var pos = self.entity.getPosition();
            rayEnd.add2(pos, groundCheckRay);
            self.onGround = false;
            app.systems.rigidbody.raycastFirst(pos, rayEnd, function(result) { self.onGround = true; });
        }
    };

    return Character_Controller;
});