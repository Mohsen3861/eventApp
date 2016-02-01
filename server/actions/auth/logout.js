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
        delete req.session.userId;
        res.send();
    };
};
