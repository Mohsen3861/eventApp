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

    router.put('/:id',
        bodyparser,
        app.actions.events.edit
    );

    router.put('/:id/addParticipant',
        app.actions.events.addParticipant
    );

    router.put('/:id/removeParticipant',
        app.actions.events.removeParticipant
    );

    return router;
};
