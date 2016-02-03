var cors = require('cors')
module.exports = function(app){
//  app.use(cors());
var corsOptions = {
  origin:'http://192.168.53.2:8100',
  credentials :true
};
  app.use('/api/todos', require('./todos')(app));
  app.use('/api/auth',cors(corsOptions), require('./auth')(app));
  app.use('/api/users',cors(corsOptions), require('./users')(app));
  app.use('/api/events',cors(corsOptions), require('./events')(app));
  app.use('/api/categories',cors(corsOptions), require('./categories')(app));
};
