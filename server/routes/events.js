var router = require('express').Router();
var bodyparser = require('body-parser').json();

module.exports = function(app){
    router.post('/',
        bodyparser,
        app.middlewares.authenticated,
        app.actions.events.create
    );

    router.get('/',
        app.actions.events.list
    );

    router.get('/:id',
        app.actions.events.show
    );

    router.delete('/:id',
        app.actions.events.remove
    );

    return router;
};
