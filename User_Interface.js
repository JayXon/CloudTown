// User Interface
// - mgmgmg
//
// Requires:
// - ...
//
// Authors: Frank DiCola, Sen Jiang, Slavik Turets


pc.script.create('User_Interface', function (app) {

    var User_Interface = function (entity) {
        this.entity = entity;
        this.currentHP = "99999";
    };

    User_Interface.prototype = {

        initialize: function () {
            console.log("User_Interface... Initialized.");

            // Find the Network Manager
            this.Network_Manager = app.root.getChildren()[0].script.Network_Manager;

            this.loadcss('https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.11.6/semantic.min.css');

            if ( pc.input.Mouse.isPointerLocked() ) {
                console.log("lockeeeeeeeeeed");
                app.mouse.disablePointerLock();
            }

            var buttonMenu = document.createElement('div');
            buttonMenu.id = 'mainMenu';
            buttonMenu.style.position = 'absolute';
            buttonMenu.style.left = '45%';
            buttonMenu.style.top = '35%';

            var playButton = document.createElement('div');
            playButton.className = "ui button green";
            playButton.style.width = '200px';
            playButton.style.margin = '10px';
            playButton.id = 'PlayButton';
            playButton.innerHTML = "<i class=\"play icon\"></i> Play";
            playButton.onclick = this.playGame.bind(this);
            buttonMenu.appendChild(playButton);

            buttonMenu.appendChild(document.createElement('br'));

            var settingsButton = document.createElement('div');
            settingsButton.className = "ui button green";
            settingsButton.style.width = '200px';
            settingsButton.style.margin = '10px';
            settingsButton.id = 'settingsButton';
            settingsButton.innerHTML = "<i class=\"settings icon\"></i> Settings";
            settingsButton.onclick = this.showSettingsPanel.bind(this);
            buttonMenu.appendChild(settingsButton);

            buttonMenu.appendChild(document.createElement('br'));

            var helpButton = document.createElement('div');
            helpButton.className = "ui button green";
            helpButton.style.width = '200px';
            helpButton.style.margin = '10px';
            helpButton.id = 'helpButton';
            helpButton.innerHTML = "<i class=\"help icon\"></i> Help";
            helpButton.onclick = this.showHelpPanel.bind(this);
            buttonMenu.appendChild(helpButton);

            buttonMenu.appendChild(document.createElement('br'));

            var creditsButton = document.createElement('div');
            creditsButton.className = "ui button green";
            creditsButton.style.width = '200px';
            creditsButton.style.margin = '10px';
            creditsButton.id = 'creditsButton';
            creditsButton.innerHTML = "<i class=\"book icon\"></i> Credits";
            creditsButton.onclick = this.showCreditsPanel.bind(this);
            buttonMenu.appendChild(creditsButton);

            document.querySelector('body').appendChild(buttonMenu);

            var healthDisplay = document.createElement('div');
            healthDisplay.id = 'HP';
            healthDisplay.className = 'ui label';
            healthDisplay.style.position = 'relative';
            healthDisplay.style.color = 'red';

            document.querySelector('body').appendChild(healthDisplay);
            // Set initial values
            this.setHealthDisplay( 50 );

            var bulletsDisplay = document.createElement('div');
            bulletsDisplay.id = 'Bullets';
            bulletsDisplay.className = 'ui label';
            bulletsDisplay.style.position = 'relative';
            bulletsDisplay.style.color = 'gray';

            document.querySelector('body').appendChild(bulletsDisplay);
            this.setBulletsDisplay( 50 );

            var uiPanel = document.createElement('div');
            uiPanel.className = "ui modal";
            uiPanel.id = 'uiPanel';

            var closeButton = document.createElement('i');
            closeButton.className = "close icon";
            uiPanel.appendChild(closeButton);

            var title = document.createElement('div');
            title.className = "header";
            title.id = 'uiTitle';
            uiPanel.appendChild(title);

            var description = document.createElement('div');
            description.className = "content";
            description.id = 'desc';
            uiPanel.appendChild(description);

            document.querySelector('body').appendChild(uiPanel);

            var Msg = document.createElement('div');
            Msg.id = 'msg';
            Msg.className = 'ui floating compact message';
            Msg.innerHTML = 'Press E to Unlock';
            Msg.style.display = 'none';
            Msg.style.top = '20%';
            Msg.style.left = '45%';
            Msg.style.position = 'absolute';

            document.querySelector('body').appendChild(document.createElement('br'));
            document.querySelector('body').appendChild(Msg);
        },

        update: function (dt) {
        },

        setHealthDisplay : function ( hp ) {
            document.getElementById('HP').innerHTML = '<i class="heart icon"></i>' + hp;
        },

        setBulletsDisplay : function ( bullets ) {
            document.getElementById('Bullets').innerHTML = '<i class="circle icon"></i>' + bullets;
        },

        showCreditsPanel: function () {
            console.log("show uiPanel");

            document.getElementById('uiTitle').innerHTML = "Credits";
            //document.getElementById('mainMenu').style.visibility = 'hidden';
            document.getElementById('desc').innerHTML = "The game \"STEM PARADISE\" was developed by Frank Dicola, Sen Jiang and Svyatoslav Turets. \
                                                         All of them have been graduate students in Stevens Institute of Technology. \"STEM PARADISE\" was their master project in software engineering program.";

            $('#uiPanel').modal('show');
        },

        showSettingsPanel: function () {
            console.log("show uiPanel");

            document.getElementById('uiTitle').innerHTML = "Settings";
            //document.getElementById('mainMenu').style.visibility = 'hidden';
            document.getElementById('desc').innerHTML = "";

            $('#uiPanel').modal('show');
        },

        showHelpPanel: function () {
            console.log("show uiPanel");

            document.getElementById('uiTitle').innerHTML = "Help";
            //document.getElementById('mainMenu').style.visibility = 'hidden';
            document.getElementById('desc').innerHTML = "The goal of the game is to provide high school students with  basic knowledge in C++. The player \
                                                          has to bump into the treasury chests to get questions. The treasury box provides either ammunition or health \
                                                           in case the player answers the question correctly.";

            $('#uiPanel').modal('show');
        },

        loadcss: function (filename) {
            var fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
            if (typeof fileref != "undefined")
                document.getElementsByTagName("head")[0].appendChild(fileref);
        },

        playGame: function() {
            document.getElementById('mainMenu').style.visibility = 'hidden';
            var player = app.root.findByName('Player');
            player.script.Third_Person_Camera.unlockInput();
            player.script.Player_Input.unlockInput();

            if (player.script.Character_Controller.gameState === 0) {

            	// console.log(this.Network_Manager);
            	this.Network_Manager.spawnYourPlayer( player );

                /*
                // Array of possible player colors
                // var colors = [ redSkin, blueSkin, greenSkin, yellowSkin, orangeSkin ]

                // random position and angle
                var x = Math.random() * 250 - 175;
                var y = Math.random() * 25;
                var z = Math.random() * 250 - 75;
                var ey = Math.random() * 360;
                var colorIndex = Math.floor(Math.random() * 8);

                player.rigidbody.teleport(x, y, z, 0, ey, 0);

                var data = {
                    x : x,
                    y : y,
                    z : z,
                    ex : 0,
                    ey : ey
                }
                
                // send join message to server
                //app.root.getChildren()[0].script.Client.send('player_joined', data);	*/
                player.script.Character_Controller.gameState = 1;
            }
        },

        showMenu: function() {
            if ($('#panel').modal('is active'))
                return;
            
            var player = app.root.findByName('Player');
            if (player.script.Character_Controller.gameState === 0) {
                document.getElementById('PlayButton').innerHTML = '<i class="play icon"></i> Play';
            } else {
                document.getElementById('PlayButton').innerHTML = '<i class="play icon"></i> Resume';
                if (document.getElementById('mainMenu').style.visibility === 'visible') {
                    this.playGame();
                    return;
                }
            }
            document.getElementById('mainMenu').style.visibility = 'visible';
            player.script.Third_Person_Camera.lockInput();
            player.script.Player_Input.lockInput();

        }
    };



    return User_Interface;
});