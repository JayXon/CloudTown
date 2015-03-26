/*
pc.script.attribute("horizontalControl", "boolean", true, {displayName: "Horizontal Control"}); // True or False, Horizontal control
pc.script.attribute("horizontalSensitivity", "number", 5, {displayName: "Horizontal Sensitivity"}); // How fast the camera moves left and right - lower numbers are faster
pc.script.attribute("verticalControl", "boolean", true, {displayName: "Vertical Control"}); // True or False, Vertical control
pc.script.attribute("verticalSensitivity", "number", 5, {displayName: "Vertical Sensitivity"}); // How fast the camera moves up and down - lower numbers are faster
pc.script.attribute("verticalBounds", "vector", [-45, 45, 0], {displayName: "Vertical Bounds"}); // The limiting angle bound that the camera may not cross
*/

// Third Person Camera
// - Handle mouse input and move the Player according to it
//
// Requires:
// - This script should be above Player_Input in the Script Queue, or it BREAKS.
//
// Authors: Frank DiCola

pc.script.create('Third_Person_Camera', function (app)
{
    // Creates a new Third_Person_Camera instance
    var Third_Person_Camera = function (entity)
    {
        this.entity = entity;

        this.horizontalControl = true;
        this.horizontalSensitivity = 5;
        this.verticalControl = false;
        this.verticalSensitivity = 5;
        this.verticalBounds = [-45, 45, 0];

        // Camera Euler angle rotation
        this.ex = 0;
        this.ey = 0;

        // Disable the right click menu in the game
        app.mouse.disableContextMenu();
        app.mouse.on(pc.input.EVENT_MOUSEMOVE, this.onMouseMove, this);
        app.mouse.on(pc.input.EVENT_MOUSEDOWN, this.onMouseDown, this);
        
        // For locking input when menus appear and the mouse is needed
        this.isInputLocked = false;
    };

    Third_Person_Camera.prototype =
    {
        initialize: function ()
        {
            this.Question = app.root.getChildren()[0].script.Question;

            // set initial angle
            var angles = this.entity.getEulerAngles();
            this.ey = angles.y;
        },

        update: function (dt)
        {
            this.entity.setEulerAngles(this.ex, this.ey, 0);
        },

        onMouseMove: function (event)
        {
            if ( this.isInputLocked )
                return;

            if ( this.horizontalControl )
            {
                this.ey -= event.dx / this.horizontalSensitivity;
            }

            if ( this.verticalControl )
            {
                this.ex -= event.dy / this.verticalSensitivity;
                this.ex = pc.math.clamp(this.ex, this.verticalBounds.x, this.verticalBounds.y);
            }
        },

        onMouseDown: function (event)
        {
            if ( !pc.input.Mouse.isPointerLocked() && !this.isInputLocked )
            {
                app.mouse.enablePointerLock();
            }
        },
        
        lockInput: function () {
            this.isInputLocked = true;
        },
        
        unlockInput: function () {
            this.isInputLocked = false;
        }
    };

    return Third_Person_Camera;
});