var cors = require('cors')
module.exports = function(app){
  var corsOptions = {
    origin:'http://localhost:8100',
    credentials :true
  };
app.use(cors(corsOptions));
/*

*/
  app.use('/api/todos', require('./todos')(app));
  app.use('/api/auth', require('./auth')(app));
  app.use('/api/users', require('./users')(app));
  app.use('/api/events', require('./events')(app));
  app.use('/api/categories', require('./categories')(app));
};
