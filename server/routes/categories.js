var router = require('express').Router();
var bodyparser = require('body-parser').json();

module.exports = function(app){
    router.post('/',
        bodyparser,
        app.middlewares.authenticated,
        app.actions.categories.create
    );

    router.get('/',
        app.actions.categories.list
    );

    router.get('/:id',
        app.actions.categories.show
    );

    router.delete('/:id',
        app.actions.categories.remove
    );

    router.put('/:id',
        bodyparser,
        app.actions.categories.edit
    );


    return router;
};
