// Treasure Box
// - Handles collisions with Players
// - Displays Questions
//
// Requires:
// - Question script to exist
//
// Authors: Frank DiCola, Sen Jiang, Slavik Turets

pc.script.attribute('materials', 'asset', [], { type: 'material' });

pc.script.create('Treasure_Box', function (app)
{
    var targetPlayer;

    // Creates a new Treasure_Box instance
    var Treasure_Box = function (entity) {
        this.entity = entity;
    };

    Treasure_Box.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            console.log("Treasure_Box... Initialized.");
            this.entity.collision.on('collisionstart', this.onCollisionStart, this);
            this.entity.collision.on('collisionend', this.onCollisionEnd, this);

            this.Question = app.root.getChildren()[0].script.Question;

            // console.log(this.entity.name);
            this.id = parseInt(this.entity.name.slice(9));

            // Treasure Box has no difficulty by default
            this.difficulty = -1;
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        },

        onCollisionStart: function (result) {
            if (result.other.name === "Player")
            {
                // Save a reference to THIS Player
                this.targetPlayer = result.other;
                // console.log(this.targetPlayer);

                this.targetPlayer.script.Player_Input.treasureBoxID = this.id;

                $('#msg').show();
            }
        },

        onCollisionEnd: function (other) {
            if (other.name === "Player")
                $('#msg').hide();
        },

        generateQuestion: function () {
            // set it back to -1
            this.targetPlayer.script.Player_Input.treasureBoxID = -1;

            $('#msg').hide();

            // Generate a new question
            this.Question.generate(this.targetPlayer, this.id);

            // Stop the Player that touched us from moving. (Should be it's own function, probably)
            this.targetPlayer.script.Player_Input.lockInput();
            this.targetPlayer.script.Third_Person_Camera.lockInput();
        },

        setDifficulty: function ( type ) {
            this.difficulty = type;

            if (this.difficulty == 0) {
                console.log("Easy moed");

                // Set difficulty to easy
                var boxColor = app.assets.getAssetById(this.materials[0]).resource;
                this.entity.model.model.meshInstances[0].material = boxColor;
            }
            else if ( this.difficulty == 1 ) {
                console.log("hard mode");

                // Set difficulty to hard
                var boxColor = app.assets.getAssetById(this.materials[1]).resource;
                this.entity.model.model.meshInstances[0].material = boxColor;
            }
            else {
                console.log("NOOOOOOOOO");

                // Set difficulty to error
            }
        }
    };

    return Treasure_Box;
});