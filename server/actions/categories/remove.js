module.exports = function(app) {
    return function(req, res, next){
      var allowCrossDomain = function(req, res) {
          res.header('Access-Control-Allow-Origin', 'example.com');
          res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
          res.header('Access-Control-Allow-Headers', 'Content-Type');
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "X-Requested-With");
      }

      allowCrossDomain(req, res);
        app.models.Category.findOne({
                _id: req.params.id
            }, function(err, category){
                if(err)
                    return res.status(500).send(err);

                  if(category.events.length == 0){
                      category.remove(function(error , result){
                      res.send("the category is succecfully removed");

                    });
                  }else{
                    res.status(401).send("you can't remove this category. because the category is not empty");
                  }

            });
    }
};
