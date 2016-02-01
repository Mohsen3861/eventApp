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
    var data = req.body;
    var id = req.params.id;
    console.log("updated : "+req.params.id +" new title : "+req.body.title);

    app.models.Category.findOne({ _id: req.params.id }, function(error, category){
      if(error){
        res.json(error);
      }
      else if(category == null){
        res.json('no such category!')
      }
      else{
        if(category.userId == req.session.userId){
        category.update(req.body, function(error, data){
          if(error){
            res.json(error);
          }
          else{
            res.json(data);
          }

        });
      }else{
        res.status(401).send("You are not the creator of this category");
      }

      }
    });

  }
}
