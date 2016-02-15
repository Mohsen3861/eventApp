var itemsPerPage = 5;
module.exports = function(app) {


    return function(req, res, next){
      var allowCrossDomain = function(req, res) {
        res.header('Access-Control-Allow-Origin','http://localhost:8100');
          res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
          res.header('Access-Control-Allow-Headers', 'Content-Type');
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      }
      var page = req.params.num;
      allowCrossDomain(req, res);

      var category =req.body.category;

      return app.models.Event
      .find({"category": category}).sort({updatedAt: -1}).skip(itemsPerPage * page).limit(itemsPerPage).exec(function(err, instances){
    			if(err)
    				return res.status(500).send(err);

    			res.send(instances);
    		})
    }
};
//$gte: req.params.num * itemsPerPage, $lte: ((req.params.num * itemsPerPage)+itemsPerPage)}
//.find({ "num": {$gte: (page * itemsPerPage)+1 , $lte:((page * itemsPerPage)+itemsPerPage)} }).sort({updatedAt: -1}).exec(function(err, instances){
