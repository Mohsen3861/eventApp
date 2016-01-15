module.exports = function(app) {
  return function(req, res, next){
    var id = req.params.id;
    console.log("updated particips: "+req.params.id );

    app.models.Category.findOne({ _id: req.params.id }, function(error, category){
      if(error){
        res.json(error);
      }
      else if(category == null){
        res.json('no such category!')
      }
      else{
        if(contains(category.events,req.body.eventId) == false){

          category.events.push(req.body.eventId);
          console.log("add particips : "+category.events);

          category.update({events:category.events},function(error, data){
            if(error){
              res.json(error);
            }
            else{
              res.json(data);
            }

          });

        }else{
          res.status(401).send("event already exists in this category");
        }


      }
    });

    function contains(a, obj) {
      var i = a.length;
      while (i--) {
        if (a[i] == obj) {
          return true;
        }
      }
      return false;
    }

  }
}
