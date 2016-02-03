module.exports = function(app) {
  return function(req, res, next){
    var allowCrossDomain = function(req, res) {
      res.header('Access-Control-Allow-Origin','http://localhost:8100');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
    }

    allowCrossDomain(req, res);
    var data = req.body;
    var id = req.params.id;
    console.log("updated : "+req.params.id +" new title : "+req.body.title);

    app.models.Event.findOne({ _id: req.params.id }, function(error, event){
      if(error){
        res.json(error);
      }
      else if(event == null){
        res.json('no such event!')
      }
      else{
        if(req.session.userId == event.userId){
          event.update(req.body, function(error, data){
            if(error){
              res.json(error);
            }
            else{
              res.json(data);
            }

          });

        }else{
          res.status(401).send("you cant't modify this event , because you are not the creater of this event");
        }

      }
    });

  }
}
