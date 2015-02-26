// Player Input
// - Handle input from a keyboard
//
// Requires:
// - Nothing
//
// Authors: Frank DiCola


pc.script.create('Player_Input', function (context) {

    // Creates a new Player_Input instance
    var Player_Input = function (entity) {
        this.entity = entity;

        this.x = new pc.Vec3();
        this.z = new pc.Vec3();
        this.heading = new pc.Vec3();

        this.controller = new pc.input.Controller(window);

        this.controller.registerKeys('forward', [pc.input.KEY_UP, pc.input.KEY_W]);
        this.controller.registerKeys('back', [pc.input.KEY_DOWN, pc.input.KEY_S]);
        this.controller.registerKeys('left', [pc.input.KEY_LEFT, pc.input.KEY_A]);
        this.controller.registerKeys('right', [pc.input.KEY_RIGHT, pc.input.KEY_D]);
        this.controller.registerKeys('jump', [pc.input.KEY_SPACE]);
    };

    Player_Input.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function ()
        {
            this.camera = context.root.findByName('Camera');
            this.character = this.entity;
            this.characterController = 'Character_Controller';
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt)
        {
            var input = false;

            // Calculate our heading in the XZ plane
            var transform = this.camera.getWorldTransform();

            transform.getZ(this.z);
            this.z.y = 0;
            this.z.normalize()

            transform.getX(this.x);
            this.x.y = 0;
            this.x.normalize();

            this.heading.set(0, 0, 0);

            // Strafe left/right
            if ( this.controller.isPressed('left') )
            {
                this.heading.sub(this.x);
                input = true;
            }
            else if ( this.controller.isPressed('right') )
            {
                this.heading.add(this.x);
                input = true;
            }

            // Forwards and Backwards
            if ( this.controller.isPressed('forward') )
            {
                this.heading.sub(this.z);
                input = true;
            }
            else if ( this.controller.isPressed('back') )
            {
                this.heading.add(this.z);
                input = true;
            }

            if ( input )
            {
                this.heading.normalize();
            }

            // Attempt to fix slowfalling
            // this.heading.y = -1;
            this.character.script.Character_Controller.move(this.heading);

        }
    } // ;???

    return Player_Input;
});