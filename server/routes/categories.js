var router = require('express').Router();
var bodyparser = require('body-parser').json();

module.exports = function(app){
    router.post('/',
        bodyparser,
        app.middlewares.authenticated,
        app.actions.categories.create
    );

    router.get('/',
        app.middlewares.authenticated,
        app.actions.categories.list
    );

    router.get('/:id',
        app.middlewares.authenticated,
        app.actions.categories.show
    );

    router.delete('/:id',
        app.middlewares.authenticated,
        app.actions.categories.remove
    );

    router.put('/:id',
        app.middlewares.authenticated,
        bodyparser,
        app.actions.categories.edit
    );

    router.put('/:id/addEvent',
        app.middlewares.authenticated,
        bodyparser,
        app.actions.categories.addEvent
    );

    router.put('/:id/removeEvent',
        app.middlewares.authenticated,
        bodyparser,
        app.actions.categories.removeEvent
    );


    return router;
};
