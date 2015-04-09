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

            this.loadcss('https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.11.6/semantic.min.css');

            if ( pc.input.Mouse.isPointerLocked() ) {
                console.log("lockeeeeeeeeeed");
                app.mouse.disablePointerLock();
            }

            var buttonMenu = document.createElement('div');
            buttonMenu.id = 'buttMenu';
            buttonMenu.style.position = 'absolute';
            buttonMenu.style.left = '45%';
            buttonMenu.style.top = '35%';

            var playButton = document.createElement('div');
            playButton.className = "ui button green";
            playButton.style.width = '200px';
            playButton.style.margin = '10px';
            playButton.id = 'PlayButton';
            playButton.innerHTML = "<i class=\"play icon\"></i> Play Game ";
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
            //document.getElementById('buttMenu').style.visibility = 'hidden';
            document.getElementById('desc').innerHTML = "The game \"STEM PARADISE\" was developed by Frank Dicola, Sen Jiang and Svyatoslav Turets. \
                                                         All of them have been graduate students in Stevens Institute of Technology. \"STEM PARADISE\" was their master project in software engineering program.";

            $('#uiPanel').modal('show');
        },

        showSettingsPanel: function () {
            console.log("show uiPanel");

            document.getElementById('uiTitle').innerHTML = "Settings";
            //document.getElementById('buttMenu').style.visibility = 'hidden';
            document.getElementById('desc').innerHTML = "";

            $('#uiPanel').modal('show');
        },

        showHelpPanel: function () {
            console.log("show uiPanel");

            document.getElementById('uiTitle').innerHTML = "Help";
            //document.getElementById('buttMenu').style.visibility = 'hidden';
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
            document.getElementById('buttMenu').style.visibility = 'hidden';
            var player = app.root.findByName('Player');
            player.script.Third_Person_Camera.unlockInput();
            player.script.Player_Input.unlockInput();

            // random position and angle
            var x = Math.random() * 250 - 175;
            var y = Math.random() * 25;
            var z = Math.random() * 250 - 75;
            var ey = Math.random() * 360;

            player.rigidbody.teleport(x, y, z, 0, ey, 0);

            var data = {
                x : x,
                y : y,
                z : z,
                ex : 0,
                ey : ey
            }
            // send join message to server
            app.root.getChildren()[0].script.Client.send('player_joined', data);
        }
    };



    return User_Interface;
});