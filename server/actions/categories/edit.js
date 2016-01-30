module.exports = function(app) {
  return function(req, res, next){
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
