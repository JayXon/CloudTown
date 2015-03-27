// User Interface
// - mgmgmg
//
// Requires:
// - ...
//
// Authors: Frank DiCola, Sen Jiang, Slavik Turets


pc.script.create('User_Interface', function (context) {

    var User_Interface = function (entity) {
        this.entity = entity;

    };

    User_Interface.prototype = {

        initialize: function () {
            console.log("User_Interface... Initialized.");
        },

        update: function (dt) {
        }

    };

    return User_Interface;
});