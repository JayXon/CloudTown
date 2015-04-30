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
    var origin = new pc.Vec3( 0, 0, 0 );
    var GAME_STATES = {
        MainMenu: 0,
        Alive: 1,
        Dead: 2
    };

    // Creates a new Character_Controller instance
    var Character_Controller = function (entity) {
        this.entity = entity;
        this.onGround = false;

        this.moveSpeed = 40;
        this.jumpPower = new pc.Vec3( 0, 8000, 0 );
    };

    Character_Controller.prototype = {

        initialize: function () {
            console.log("Character_Controller... Initialized.");

            this.camera_script = this.entity.script.Third_Person_Camera;
            this.question_script = app.root.getChildren()[0].script.Question;
            this.User_Interface = app.root.getChildren()[0].script.User_Interface;
            this.Music_Controller = app.root.getChildren()[0].script.Music_Controller;

            this.gameState = GAME_STATES.MainMenu;

            this.bullets = 50;
        },

        update: function (dt) {
            this._checkGround();
            
            if ( this.entity.name === "Player" && this.gameState === GAME_STATES.Alive )
            {
                // Apply gravity manually for more tuning control
                this.entity.rigidbody.applyForce(0, -9000, 0);
            }
        },

        // Attack with the equipped weapon in the direction
        // the character is facing.
        attack: function ()
        {
            if (this.bullets <= 0) {
                console.log("no more bullets!");
                return;
            }
            this.bullets--;
            if ( this.entity.name === "Player")
                this.User_Interface.setBulletsDisplay(this.bullets);

            var pos = this.entity.getPosition();

            var shootDirection = new pc.Vec3( 0, 0, 1 );
            var tmpQuat = this.entity.getRotation();
            shootDirection = tmpQuat.transformVector(shootDirection);
            
            /*
            var projectile = new pc.Entity();
            projectile.setPosition( pos.add2(pos, shootDirection.scale(15) ) );
            projectile.setLocalScale( 3, 3, 3 );
            projectile.addComponent("model", { type: 'sphere', });
            projectile.addComponent("collision", { type: 'sphere', radius: 1.5, });
            projectile.addComponent("rigidbody", { type: 'dynamic', });
            
            var myBeep = app.assets.find("TestBeep", pc.asset.ASSET_AUDIO);
            projectile.addComponent("audiosource", { assets: myBeep, loop: true });
            //  console.log(projectile.audiosource);*/


            // Create duplicate Bullet
            var projectile = app.root.findByName('_Bullet').clone();
            projectile.setName('Bullet');
            projectile.setPosition( pos.add2(pos, shootDirection.scale(15) ) );
            projectile.enabled = true;


            projectile.rigidbody.applyForce( shootDirection.scale(2500) );
            app.root.addChild(projectile);
            app.systems.script.addComponent(projectile, {
                scripts : [{
                    url : 'Projectile.js'
                }]
            });
        },

        adjustBullets: function (amount) {
            this.bullets += amount;
            
            if ( this.entity.name === "Player")
                this.User_Interface.setBulletsDisplay(this.bullets);
        },

        die: function () {
            // Lock your input
            if ( this.entity.name === "Player" ) {
                this.entity.script.Player_Input.lockInput();
                this.entity.script.Third_Person_Camera.lockInput();
                
                // Generate a Question to respawn
                this.question_script.generate(this.entity, -1);

                // Send him to Heaven
                this.entity.rigidbody.teleport( -350, 150, -350, 0, 0, 0 );
                this.entity.setEulerAngles(0, 45, 0);
                console.log("Right now I am at..." + this.entity.getPosition().toString());
                console.log("Right now I'm looking..." + this.entity.getEulerAngles().toString());
                this.move( new pc.Vec3(0,0,0) );
                this.entity.rigidbody.enabled = false;
            }

            // Set state to "Dead"
            this.setState( GAME_STATES.Dead );
            console.log("I JUST DIED, SEE? " + this.gameState );

            this.entity.getChildren().forEach( function (child) {
                if ( child.name !== "Camera")
                    child.enabled = false;
            });
        },

        spawn: function () {
            // Spawn him in the world with full health in a random place
            var x = Math.random() * 250 - 175;
            var y = Math.random() * 25;
            var z = Math.random() * 250 - 75;
            var ey = Math.random() * 360;
            this.entity.rigidbody.teleport( x, y, z, 0, ey, 0 );

            // Control yourself
            if ( this.entity.name === "Player" ) {
                //this.entity.script.Player_Input.unlockInput();
                //this.entity.script.Third_Person_Camera.unlockInput();
            }

            // Add everything back
            this.entity.getChildren().forEach( function (child) {
                child.enabled = true;
            });

            // Maximum health restored
            this.entity.script.Damagable.adjustHealth(50);

            // Enable Rigidbody
            this.move( new pc.Vec3(0,0,0) );
            this.entity.rigidbody.enabled = true;
            
            // Set state to Alive
            this.setState( GAME_STATES.Alive );
        },

        jump: function ( ) {
            console.log("Jump!");

            if ( this.onGround ) {
                this.entity.rigidbody.applyImpulse( this.jumpPower, origin );
                
                app.root.findByName('Sound').audiosource.play("Jump1");
            }
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
            // this.entity.rigidbody.linearVelocity = new pc.Vec3(0, 0, 0);
        },

        _checkGround: function () {
            var self = this;
            var pos = self.entity.getPosition();
            rayEnd.add2(pos, groundCheckRay);
            self.onGround = false;
            app.systems.rigidbody.raycastFirst(pos, rayEnd, function(result) { self.onGround = true; });
        },

        setState: function ( state ) {

            this.gameState = state;

            if ( this.entity.name === "Player" )
            {
                // Your Aesthetics
                this.Music_Controller.switchSong( state );
            }
        }
    };

    return Character_Controller;
});