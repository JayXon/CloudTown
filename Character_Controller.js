// pc.script.attribute("moveSpeed", "number", 10, {displayName: "Move Speed"}); // Running speed

// Character Controller
// - Move the player, play animations, handle death and respawning
//
// Requires:
// - Nothing
//
// Authors: Frank DiCola


pc.script.create('Character_Controller', function (context) {

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
            shootRayEnd.mul(self.entity.forward, pos);

            // shootRayEnd.add2(pos, self.entity.forward);
            // shootRayEnd.scale(1000000);
            context.systems.rigidbody.raycastFirst(pos, shootRayEnd, function(result) 
            {
                // Spawn a box
                var spawnedBox = new pc.Entity();
                spawnedBox.addComponent("model", { type: 'box', });
                context.root.addChild(spawnedBox);
                spawnedBox.setPosition(result.point);
                spawnedBox.setLocalScale(5, 5, 5);
            });
        },

        // Move the character in the direction supplied
        move: function (direction) {
            if ( this.onGround && !this.isControlLocked ) {
                direction.scale(this.moveSpeed);
                this.entity.rigidbody.linearVelocity = direction;
            }
        },

        _checkGround: function () {
            var self = this;
            var pos = self.entity.getPosition();
            rayEnd.add2(pos, groundCheckRay);
            self.onGround = false;
            context.systems.rigidbody.raycastFirst(pos, rayEnd, function(result) { self.onGround = true; });
        }
    };

    return Character_Controller;
});