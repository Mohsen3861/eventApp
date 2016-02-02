var cors = require('cors')
module.exports = function(app){
  app.use(cors());
  app.use('/api/todos', require('./todos')(app));
  app.use('/api/auth', require('./auth')(app));
  app.use('/api/users', require('./users')(app));
  app.use('/api/events', require('./events')(app));
  app.use('/api/categories', require('./categories')(app));
};
