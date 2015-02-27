// Treasure Box
// - Handles collisions with Players
// - Displays Questions
//
// Requires:
// - Question script to exist
//
// Authors: Frank DiCola, Sen Jiang, Slavik Turets

pc.script.create('Treasure_Box', function (app)
{
    // Creates a new Treasure_Box instance
    var Treasure_Box = function (entity) {
        this.entity = entity;
    };

    Treasure_Box.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.entity.collision.on('collisionstart', this.onCollisionStart, this);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        },

        onCollisionStart: function (result)
        {
            if (result.other.name === "Player")
            {
                // TO DO: This should pass information along to Question (i.e. the Player Object)
                this.entity.script.Question.generate();
            }
        }
    };

    return Treasure_Box;
});