module.exports = function (app) {

    app.set ('port', process.env.port || 1337);
    // app.set ('projectId', '[circular-source-174612]');
    // app.set ('keyFilename', './Dinamika-nodejs-91e51442875f.json');


    return {
        get: function (variable) {
            return app.get (variable);
        }
    };

};
