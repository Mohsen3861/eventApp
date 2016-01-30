var formData = require("express-form-data").json();
var router = require('express').Router();
var bodyparser = require('body-parser').json();
var multer = require('multer');
var upload = multer({dest: './uploads/'});
module.exports = function(app){


    router.post('/',
        bodyparser,
        upload.single('photo'),
        app.middlewares.authenticated,
        app.actions.events.create
    );

    router.get('/',
        app.middlewares.authenticated,
        app.actions.events.list

    );

    router.get('/:id',
        app.middlewares.authenticated,
        app.actions.events.show
    );

    router.delete('/:id',
        app.middlewares.authenticated,
        app.actions.events.remove
    );

    router.put('/:id',
        app.middlewares.authenticated,
        bodyparser,
        app.actions.events.edit
    );

    router.put('/:id/addParticipant',
        app.middlewares.authenticated,
        app.actions.events.addParticipant
    );

    router.put('/:id/removeParticipant',
        app.middlewares.authenticated,
        app.actions.events.removeParticipant
    );

    return router;
};
