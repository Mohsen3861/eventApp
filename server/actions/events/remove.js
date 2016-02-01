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
        app.models.Event.findOne({
                _id: req.params.id
            }, function(err, event){
                if(err)
                    return res.status(500).send(err);
              if(event.userId == req.session.userId){
                event.remove(function(error,data){
                  res.send("the event is succecfully removed !");

                });
              }else{
                res.status(401).send("you cant remove this event , because you are not the creator");
              }
            });

    }
};
