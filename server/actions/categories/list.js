module.exports = function(app) {
    return function(req, res, next){
      var allowCrossDomain = function(req, res) {
        res.header('Access-Control-Allow-Origin','http://localhost:8100');
          res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
          res.header('Access-Control-Allow-Headers', 'Content-Type');
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "X-Requested-With");
      }

      allowCrossDomain(req, res);
    	return app.models.Category
      .find(function(err, instances){
    			if(err)
    				return res.status(500).send(err);

    			res.send(instances);
    		})
    }
};
