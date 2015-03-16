// Network Manager
// - Handle logging in
// - Spawn your Player in a random position
//
// Requires:
// - Nothing
//
// Authors: Frank DiCola, Sen Jiang, Slavik Turets


pc.script.create('Network_Manager', function (app) {

    var Network_Manager = function (entity) {
        this.entity = entity;
    };

    Network_Manager.prototype = {

        initialize: function () {
            console.log("Network_Manager... Initialized.");

            this.Client = app.root.getChildren()[0].script.Client;

            // create new player
            var player = app.root.findByName('Player').clone();

            var x = Math.random() * 150 - 75;
            var y = Math.random() * 25;
            var z = Math.random() * 150 - 75;
            var ey = Math.random() * 360;

            var camera = new pc.Entity();
            camera.setName('Camera');
            camera.addComponent('camera');
            player.addChild(camera);
            camera.setLocalPosition(0, 15, -35);
            camera.setLocalEulerAngles(160, 0, 180);

            app.systems.script.addComponent(player, {
                scripts : [{
                    url : 'Character_Controller.js'
                }, {
                    url : 'Third_Person_Camera.js'
                }, {
                    url : 'Player_Input.js'
                }]
            });

            player.setPosition(x, y, z);
            player.setEulerAngles(0, ey, 0);
            player.enabled = true;

            app.root.addChild(player);

            console.log(app.root);

            var data = {
                x : x,
                y : y,
                z : z,
                ey : ey
            }
            this.Client.send('player_joined', data);
        },

        update: function (dt) {
        },

        newPlayer : function (data) {
            console.log(data);

            var player = app.root.findByName('Player').clone();
            player.setPosition(data.x, data.y, data.z);
            player.setEulerAngles(0, data.ey, 0);
            player.enabled = true;

            app.root.addChild(player);
        }
    };

    return Network_Manager;
});