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
            var pos = this.entity.getPosition();
            
            var shootDirection = new pc.Vec3( 0, 0, 1 );
            var tmpQuat = this.entity.getRotation();
            shootDirection = tmpQuat.transformVector(shootDirection);
            
            var projectile = new pc.Entity();
            projectile.setPosition( pos.add2(pos, shootDirection.scale(15) ) );
            projectile.setLocalScale( 3, 3, 3 );
            projectile.addComponent("model", { type: 'sphere', });
            projectile.addComponent("collision", { type: 'sphere', radius: 1.5, });
            projectile.addComponent("rigidbody", { type: 'dynamic', });
            projectile.rigidbody.applyForce( shootDirection.scale(2500) );
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