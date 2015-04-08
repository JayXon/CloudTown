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
            var player = this.player = app.root.findByName('_Player').clone();
            player.setName('Player'); 

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

            player.setPosition(0, -100, -10);
            player.setEulerAngles(0, 0, 0);
            player.enabled = true;

            app.root.addChild(player);

            // console.log(player);
            
            console.log(this.player);

            this.playerLocation = {
                x : 0,
                y : 0,
                z : 0,
                ez : 0,
                ey : 0
            };
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
            var ex = this.camera_script.ex;

            // only send message to server if the location has changed
            if (position.x !== this.playerLocation.x ||
                position.y !== this.playerLocation.y ||
                position.z !== this.playerLocation.z ||
                ex !== this.playerLocation.ex ||
                ey !== this.playerLocation.ey) {
                // console.log(angle.x + ', ' + angle.y + ', ' + angle.z);
                this.playerLocation = {
                    x : position.x,
                    y : position.y,
                    z : position.z,
                    ex : ex,
                    ey : ey
                };
                this.Client.send('player_moved', this.playerLocation);
            }
        },

        newPlayer : function (data) {
            // console.log(data);
            // a new player has joined
            var player = app.root.findByName('_Player').clone();
            player.setName('Player_' + data.id);
            player.setPosition(data.x, data.y, data.z);
            player.setEulerAngles(data.ex, data.ey, 0);
            
            player.rigidbody.enabled = true; // Was false before
            player.rigidbody.type = pc.BODYTYPE_KINEMATIC;
            player.enabled = true;

            app.root.addChild(player);
        },

        movePlayer : function (data) {
            // a player has moved
            var player = app.root.findByName('Player_' + data.id);
            if (!player) {
                return;
            }
            // player.setPosition(data.x, data.y, data.z);
            // player.setEulerAngles(data.ex, data.ey, 0);
            player.rigidbody.teleport(data.x, data.y, data.z, data.ex, data.ey, 0);
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
            if (!player) {
                return;
            }

            player.destroy();
        },
        
        playerHealth : function (data) {
            var player;
            if (data.id === -1)
                player = this.player;
            else
                player = app.root.findByName('Player_' + data.id);
            if (!player) {
                return;
            }

            player.script.Damagable.adjustHealth(data.hp);
        },
        
        playerBullets : function (data) {
            var player;
            if (data.id === -1)
                player = this.player;
            else
                player = app.root.findByName('Player_' + data.id);
            if (!player) {
                return;
            }

            player.script.Character_Controller.adjustBullets(data.bullets);
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