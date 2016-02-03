module.exports = function(app) {
  return function(req, res, next){
    var allowCrossDomain = function(req, res) {
      res.header('Access-Control-Allow-Origin','http://localhost:8100');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
    }

    allowCrossDomain(req, res);
    var id = req.params.id;
    console.log("updated particips: "+req.params.id );


    app.models.Event.findOne({ _id: req.params.id }, function(error, event){
      if(error){
        res.json(error);
      }
      else if(event == null){
        res.json('no such event!')
      }
      console.log("remove particips --> session id="+req.session.userId+" creator="+event.userId);

      if(req.session.userId != event.userId){
        event.particips = remove(event.particips , req.session.userId)

        event.update({particips:event.particips},function(error, data){
          if(error){
            res.json(error);
          }
          else{
            res.json(data);
          }

        });

      }else{
        res.status(401).send('you are the creator of this event, you should participate :)');
        }
    });


    var remove = function(ary, elem) {
        var i = ary.indexOf(elem);
        if (i >= 0) ary.splice(i, 1);
        return ary;
    }

  }

}
