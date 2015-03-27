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
        
        die: function () {
            // Lock your input
            if ( this.entity.name === "Player" ) {
                this.entity.script.Player_Input.lockInput();
                this.entity.script.Third_Person_Camera.lockInput();
            }

            // Play death animation
            var children = this.entity.getChildren();

            children.forEach( function (child) {
                if ( child.name !== "Camera")
                    child.enabled = false;
            });

            // Have him sit there like a dummy
            // Take him to HELL
            // Have him solve a problem or 2

            // Respawn him in the world with full health
            this.entity.rigidbody.enabled = false;
            this.entity.setPosition( 0, 60, 60 );
            this.entity.rigidbody.enabled = true;
            
            // Control yourself
            if ( this.entity.name === "Player" ) {
                this.entity.script.Player_Input.unlockInput();
                this.entity.script.Third_Person_Camera.unlockInput();
            }

            // add everythig back
            children.forEach( function (child) {
                child.enabled = true;
            });
            
            this.entity.script.Damagable.adjustHealth(50);
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