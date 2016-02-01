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
    
    var id = req.params.id;
    console.log("updated particips: "+req.params.id );

    app.models.Event.findOne({ _id: req.params.id }, function(error, event){
      if(error){
        res.json(error);
      }
      else if(event == null){
        res.json('no such event!')
      }
      else{
        event.particips.push(req.session.userId);
        console.log("add particips : "+event.particips);

        event.update({particips:event.particips},function(error, data){
          if(error){
            res.json(error);
          }
          else{
            res.json(data);
          }

        });

      }
    });

  }
}
