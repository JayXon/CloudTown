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
            
            if ( pc.input.Mouse.isPointerLocked() )
            {
                console.log("lockeeeeeeeeeed");
                app.mouse.disablePointerLock();
            }
            
            var buttonMenu = document.createElement('div');
            buttonMenu.id = 'buttMenu';             
            buttonMenu.style.position = 'absolute';
            buttonMenu.style.left = '45%';
            buttonMenu.style.top = '35%';
            buttonMenu.style.zIndex = 1020;

            var playButton = document.createElement('div');
             playButton.className = "ui button green";
             playButton.style.width = '200px';   
             playButton.style.margin = '10px';   
             playButton.id = 'PlayButton';              
             playButton.innerHTML = "<i class=\"play icon\"></i> Play Game ";//"About Game Development"; //divContent;             
             playButton.onclick = this.playGame.bind(this);
             buttonMenu.appendChild(playButton);

             buttonMenu.appendChild(document.createElement('br'));

             var settingsButton = document.createElement('div');
             settingsButton.className = "ui button green";       //"ui vertical labeled icon buttons";
             settingsButton.style.width = '200px';
             settingsButton.style.margin = '10px'; 
             settingsButton.id = 'settingsButton';                         
             settingsButton.innerHTML = "<i class=\"settings icon\"></i> Settings";
             settingsButton.onclick = this.showDevelopmentPanel.bind(this);
             buttonMenu.appendChild(settingsButton); 

             buttonMenu.appendChild(document.createElement('br'));

             var helpButton = document.createElement('div');
             helpButton.className = "ui button green";       //"ui vertical labeled icon buttons";
             helpButton.style.width = '200px';
             helpButton.style.margin = '10px'; 
             helpButton.id = 'helpButton';                         
             helpButton.innerHTML = "<i class=\"help icon\"></i> Help";
             helpButton.onclick = this.showDevelopmentPanel.bind(this);
             buttonMenu.appendChild(helpButton); 

             buttonMenu.appendChild(document.createElement('br'));

             var creditsButton = document.createElement('div');
             creditsButton.className = "ui button green";       //"ui vertical labeled icon buttons";
             creditsButton.style.width = '200px';
             creditsButton.style.margin = '10px'; 
             creditsButton.id = 'creditsButton';                         
             creditsButton.innerHTML = "<i class=\"book icon\"></i> Credits";
             creditsButton.onclick = this.showDevelopmentPanel.bind(this);
             buttonMenu.appendChild(creditsButton); 
             
            document.querySelector('body').appendChild(buttonMenu);
            
            this.loadjscssfile("https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.11.6/semantic.min.css","css");
            var healthDisplay = document.createElement('div');
            healthDisplay.id = 'HP';
            healthDisplay.style.top = '10 px';
            healthDisplay.style.margin = '30 px';
            healthDisplay.style.padding = '8px';
            healthDisplay.style.zIndex = 1000;
            healthDisplay.style.visibility = 'visible';
            healthDisplay.style.position = 'relative';
            healthDisplay.style.color = '#FFFFFF';
            
            document.querySelector('body').appendChild(healthDisplay);
            
            // Set initial values
            this.setHealthDisplay( 50 );

            var panel = document.createElement('div');
            panel.id = 'panel';
            panel.style.top = '10%';
            panel.style.height = '75%';
            panel.style.width = '800px';
            panel.style.margin = 'auto';
            panel.style.zIndex = 1001;
            panel.style.visibility = 'hidden';
            panel.style.position = 'relative';
            panel.style.color = '#295f48';
            panel.style.backgroundColor = 'rgba(172,217,44,0.9)';
            panel.style.boxShadow = '6px 12px 14px 2px rgba(0,0,0,0.64)';

            var title = document.createElement('div');
            title.id = 'title';
            title.style.color = 'gray';
            title.style.padding = '8px';
            panel.appendChild(title);
             
            var description = document.createElement('div');
            description.id = 'desc';
            description.style.fontSize = '24px';
            description.style.padding = '8px';
            panel.appendChild(description);

            var closeButton = document.createElement('button');
            closeButton.innerHTML = 'X';
            closeButton.style.top = 0;
            closeButton.style.right = 0;
            closeButton.style.position = 'absolute';
            closeButton.style.margin = '16px';
            closeButton.onclick = this.closePanel.bind(this);
            panel.appendChild(closeButton);


            document.querySelector('body').appendChild(panel);
            
        },

        update: function (dt) {
        },
        
        setHealthDisplay : function ( hp ) {
            document.getElementById('HP').innerHTML = "Health: " + hp;
        },

        /*showUIMenu: function (){
             
             // Play button creation and configuration
             var aboutButton = document.createElement('button');
             //aboutButton.className = "ui button";       //"ui vertical labeled icon buttons";
             aboutButton.id = 'Development';
             aboutButton.style.position = 'fixed';
             aboutButton.style.left = '45%';
             aboutButton.style.top = '35%';
             //var divContent = "<div class= \"ui green button\"> <i class=\"book icon\"></i> About Game Development </div>";
             //var divContent = "<div class= \"ui green button\" > <i class=\"play icon\" ></i> Play Game </div> <div class= \"ui green button\"> <i class=\"settings icon\"></i> Settings </div> <div class= \"ui green button\"> <i class=\"help circle icon\"></i> Help </div> <div class= \"ui green button\"> <i class=\"book icon\"></i> About Game Development </div>";
             aboutButton.innerHTML = "About Game Development"; //divContent;
             aboutButton.onclick = this.showDevelopmentPanel.bind(this);
             document.querySelector('body').appendChild(aboutButton);
              
              
            
         },*/

         showDevelopmentPanel: function (){
            console.log("show panel");
            
            document.getElementById('title').innerHTML = "Game Development";
            document.getElementById('buttMenu').style.visibility = 'hidden';
            document.getElementById('desc').innerHTML = "The game \"STEM PARADISE\" was developed by Frank Dicola, Sen Jiang and Svyatoslav Turets. \
                                                         All of them have been graduate students in Stevens Institute of Technology. \"STEM PARADISE\" was their master project in software engineering program.";
            document.getElementById('panel').style.visibility = 'visible';
            //app.mouse.enablePointerLock();
         },

        loadjscssfile:function (filename, filetype){
             if (filetype=="js"){ //if filename is a external JavaScript file
             var fileref=document.createElement('script');
             fileref.setAttribute("type","text/javascript");
            fileref.setAttribute("src", filename);
            }
            else if (filetype=="css"){ //if filename is an external CSS file
            var fileref=document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
            }
            if (typeof fileref!="undefined")
               document.getElementsByTagName("head")[0].appendChild(fileref);
        },

        closePanel : function () {
            document.getElementById('panel').style.visibility = 'hidden';
            document.getElementById('buttMenu').style.visibility = 'visible';
        },
        
        playGame: function() {
          document.getElementById('buttMenu').style.visibility = 'hidden';   
          var player = app.root.findByName('Player');
          player.script.Third_Person_Camera.unlockInput();
          player.script.Player_Input.unlockInput();
        }
    };

    

    return User_Interface;
});