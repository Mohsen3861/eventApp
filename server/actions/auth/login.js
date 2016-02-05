
var md5 = require('md5');
module.exports = function(app){
    return function(req, res, next){
      var allowCrossDomain = function(req, res) {
          res.header('Access-Control-Allow-Origin','http://localhost:8100');
          res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
          res.header('Access-Control-Allow-Headers', 'Content-Type');
          res.header("Access-Control-Allow-Headers", "X-Requested-With");
      }
      console.log("before : "+ req.body.password + " after : "+md5(req.body.password));
      req.body.password = md5(req.body.password);
      
      allowCrossDomain(req, res);
        app.models.User.findOne({
            username: req.body.username,
            password: req.body.password
        }, function(err, instance){
            if(err)
                return res.status(500).send(err);

            if(!instance)
                return res.status(404).send('account not found.');

            req.session.userId = instance.id;
            res.send(instance);
        })
    };
};
