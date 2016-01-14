var mongoose = require('mongoose');

module.exports = function(app){
    app.mongoose = mongoose.connect(app.settings.db);

    app.models = {};
    app.models.Todo = require('./Todo')(app);
    app.models.User = require('./User')(app);
    app.models.Event = require('./Event')(app);
    app.models.Category = require('./Category')(app);

};
