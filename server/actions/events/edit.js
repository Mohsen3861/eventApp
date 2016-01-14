module.exports = function(app) {
    return function(req, res, next){
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
          event.update(req.body, function(error, data){
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
