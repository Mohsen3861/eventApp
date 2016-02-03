module.exports = function(app){
    return function(req, res, next){
      var allowCrossDomain = function(req, res) {
          res.header('Access-Control-Allow-Origin','http://192.168.53.2:8100');
          res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
          res.header('Access-Control-Allow-Headers', 'Content-Type');
          res.header("Access-Control-Allow-Headers", "X-Requested-With");
      }

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
