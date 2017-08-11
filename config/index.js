module.exports = function (app) {

    app.set ('port', process.env.port || 1337);


    return {
        get: function (variable) {
            return app.get (variable);
        }
    };

};
