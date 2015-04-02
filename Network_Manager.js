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
            var player = this.player = app.root.findByName('Player').clone();

            // random position and angle
            var x = Math.random() * 250 - 175;
            var y = Math.random() * 25;
            var z = Math.random() * 250 - 75;
            var ey = Math.random() * 360;

            // attach camera to player
            var camera = new pc.Entity();
            camera.setName('Camera');
            camera.addComponent('camera');
            player.addChild(camera);
            camera.setLocalEulerAngles(160, 0, 180);

            // add script to player
            app.systems.script.addComponent(player, {
                scripts : [{
                    url : 'Character_Controller.js'
                }, {
                    url : 'Third_Person_Camera.js'
                }, {
                    url : 'Player_Input.js'
                }, {
                    url : 'Damagable.js'
                }]
            });

            player.setPosition(x, y, z);
            player.setEulerAngles(0, ey, 0);
            player.enabled = true;

            app.root.addChild(player);

            // console.log(player);

            var data = this.playerLocation = {
                x : x,
                y : y,
                z : z,
                ey : ey
            }
            // send join message to server
            this.Client.send('player_joined', data);
            
            console.log(this.player);
        },

        update: function (dt) {
            if (!this.player) {
                return;
            }
            if (!this.camera_script) {
                this.camera_script = this.player.script.Third_Person_Camera;
                return;
            }

            var position = this.player.getPosition();
            // var angle = this.player.getEulerAngles();
            // getEulerAngles doesn't seems to work properly
            // have to get the correct angle from Third_Person_Camera
            var ey = this.camera_script.ey;

            // only send message to server if the location has changed
            if (position.x !== this.playerLocation.x ||
                position.y !== this.playerLocation.y ||
                position.z !== this.playerLocation.z ||
                ey !== this.playerLocation.ey) {
                // console.log(angle.x + ', ' + angle.y + ', ' + angle.z);
                this.playerLocation = {
                    x : position.x,
                    y : position.y,
                    z : position.z,
                    ey : ey
                };
                this.Client.send('player_moved', this.playerLocation);
            }
        },

        newPlayer : function (data) {
            // console.log(data);
            // a new player has joined
            var player = app.root.findByName('Player').clone();
            player.setName('Player_' + data.id);
            player.setPosition(data.x, data.y, data.z);
            player.setEulerAngles(0, data.ey, 0);
            
            // disable the rigidbody for other player for now to prevent collision with other player
            // psychheee!
            player.rigidbody.enabled = true; // Was false before
            player.enabled = true;

            app.root.addChild(player);
        },

        movePlayer : function (data) {
            // a player has moved
            var player = app.root.findByName('Player_' + data.id);
            if (!player) {
                return;
            }
            // console.log(data.ey);
            player.setPosition(data.x, data.y, data.z);
            player.setEulerAngles(0, data.ey, 0);
        },
        
        playerAttack : function (data) {
            var player = app.root.findByName('Player_' + data);
            if (!player) {
                return;
            }

            player.script.Character_Controller.attack();
        },

        deletePlayer : function (data) {
            // a player has quit
            var player = app.root.findByName('Player_' + data);
            console.log(player);

            if (!player) {
                return;
            }
            // console.log(player);
            player.destroy();
            console.log(player);
            
        },

        newTreasury: function (data) {
            // console.log(data);
            // create Treasury
            var TreasuryBox = app.root.findByName('Treasure Chest').clone();
            TreasuryBox.setName('Treasure_' + data.i);
            TreasuryBox.setPosition(data.x, data.y, data.z);
            TreasuryBox.enabled = true;
            app.root.addChild(TreasuryBox);
        },

        deleteTreasury: function (data) {
            // remove Treasure Box
            var TreasuryBox = app.root.findByName('Treasure_' + data);
            console.log(TreasuryBox);
            if (!TreasuryBox) {
                return;
            }
            TreasuryBox.destroy();
            TreasuryBox.enabled = false;
            console.log(TreasuryBox);
        }

    };

    return Network_Manager;
});