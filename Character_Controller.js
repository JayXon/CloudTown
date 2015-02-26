pc.script.attribute("moveSpeed", "number", 10, {displayName: "Move Speed"}); // Running speed

// Character Controller
// - Move the player, play animations, handle death and respawning
//
// Requires:
// - Nothing
//
// Authors: Frank DiCola


pc.script.create('Character_Controller', function (context) {

    var groundCheckRay = new pc.Vec3(0, -5.01, 0);
    var rayEnd = new pc.Vec3();

    // Creates a new Character_Controller instance
    var Character_Controller = function (entity) {
        this.entity = entity;
        this.onGround = false;
    };

    Character_Controller.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            this._checkGround();
        },

        // Move the character in the direction supplied
        move: function (direction) {
            if ( this.onGround ) {
                this.entity.rigidbody.activate();
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