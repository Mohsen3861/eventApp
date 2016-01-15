module.exports = function(app) {
  return function(req, res, next){
    var id = req.params.id;
    console.log("updated particips: "+req.params.id );


    app.models.Category.findOne({ _id: req.params.id }, function(error, category){
      if(error){
        res.json(error);
      }
      else if(category == null){
        res.json('no such event!')
      }
      console.log("remove particips --> session id="+req.session.userId+" creator="+category.userId);

      if(contains(category.events,req.body.eventId) == true){
        category.events = remove(category.events , req.body.eventId)

        category.update({events:category.events},function(error, data){
          if(error){
            res.json(error);
          }
          else{
            res.json(data);
          }

        });

      }else{
        res.status(404).send('this event does not exist in this category');
        }
    });


    var remove = function(ary, elem) {
        var i = ary.indexOf(elem);
        if (i >= 0) ary.splice(i, 1);
        return ary;
    }

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
