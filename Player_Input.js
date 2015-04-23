// Player Input
// - Handle input from a keyboard
//
// Requires:
// - Nothing
//
// Authors: Frank DiCola


pc.script.create('Player_Input', function (app) {

    // Creates a new Player_Input instance
    var Player_Input = function (entity) {
        this.entity = entity;

        this.x = new pc.Vec3();
        this.z = new pc.Vec3();
        this.heading = new pc.Vec3();

        this.controller = new pc.input.Controller(window);

        // Movement Controls
        this.controller.registerKeys('forward', [pc.input.KEY_UP, pc.input.KEY_W]);
        this.controller.registerKeys('back', [pc.input.KEY_DOWN, pc.input.KEY_S]);
        this.controller.registerKeys('left', [pc.input.KEY_LEFT, pc.input.KEY_A]);
        this.controller.registerKeys('right', [pc.input.KEY_RIGHT, pc.input.KEY_D]);
        this.controller.registerKeys('jump', [pc.input.KEY_SPACE]);
        
        // Mouse Controls
        app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);

        // Debug Controls
        this.controller.registerKeys('debug_01', [pc.input.KEY_N]);
        this.controller.registerKeys('debug_02', [pc.input.KEY_M]);

        // Menu
        app.keyboard.on(pc.EVENT_KEYUP, this.onKeyUp, this);
    };

    Player_Input.prototype = {

        initialize: function ()
        {
            console.log("Player_Input... Initialized.");
            
            this.Client = app.root.getChildren()[0].script.Client;
            this.User_Interface = app.root.getChildren()[0].script.User_Interface;

            // this.camera = app.root.findByName('Camera');
            this.camera = this.entity.findByName('Camera');
            this.character = this.entity;
            this.characterController = 'Character_Controller';
            this.isInputLocked = true;

            this.treasureBoxID = -1;
        },

        update: function (dt)
        {
            if (this.controller.wasPressed('menu')) {
                console.log('escape!!');
                this.User_Interface.showMenu();
            }

            if ( this.isInputLocked ) {
                this.character.script.Character_Controller.move(new pc.Vec3(0, 0, 0));
                return;
            }
        

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
            

            if ( this.controller.isPressed('debug_01') ) {
                //this.lockInput();
            }

            if ( this.controller.isPressed('debug_02') ) {
                //this.unlockInput();
            }

            this.character.script.Character_Controller.move(this.heading);
            
            if ( this.controller.isPressed('jump') ) {
                this.character.script.Character_Controller.jump();
            }
        },

        lockInput: function ()
        {
            this.isInputLocked = true;
            
            this.character.script.Character_Controller.slow();
        },

        unlockInput: function ()
        {
            this.isInputLocked = false;
        },

        onMouseDown: function (event) {
            
            if ( !this.isInputLocked ) {
                
                // Left Button
                if ( event.button ===  pc.MOUSEBUTTON_LEFT ) {
                    this.character.script.Character_Controller.attack();
                    this.Client.send('shoot');
                }

                if ( event.button === pc.MOUSEBUTTON_MIDDLE )
                    console.log("Middle!");
                
                if ( event.button === pc.MOUSEBUTTON_RIGHT )
                    console.log("Right!");
                
            }
        },

        onKeyUp: function (event) {
            // Check event.key to detect which key has been pressed
            if (event.key === pc.KEY_ESCAPE) {
                this.User_Interface.showMenu();
            } else if (event.key === pc.KEY_E && this.treasureBoxID >= 0) {
                var TreasureBox = app.root.findByName('Treasure_' + this.treasureBoxID);
                TreasureBox.script.Treasure_Box.generateQuestion();
            }

            // When the space bar is pressed this scrolls the window.
            // Calling preventDefault() on the original browser event stops this.
            event.event.preventDefault();
        }
    }

    return Player_Input;
});