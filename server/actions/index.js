module.exports = function(app){
    app.actions = {};
    app.actions.todos = require('./todos')(app);
    app.actions.auth = require('./auth')(app);
    app.actions.users = require('./users')(app);
      app.actions.events = require('./events')(app);
      app.actions.categories = require('./categories')(app);

};
