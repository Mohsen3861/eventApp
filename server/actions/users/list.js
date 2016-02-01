module.exports = function(app){
  return function(req, res, next){

    var allowCrossDomain = function(req, res) {
        res.header('Access-Control-Allow-Origin', 'example.com');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
    }

    allowCrossDomain(req, res);
    
      app.models.User.find(function(err, users){
          if(err)
            return res.status(500).send(err);

          res.send(users);
      });
  }
};
