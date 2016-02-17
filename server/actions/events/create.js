var fs = require('fs');
var path = "D:\\MnM\\photdo3.jpg"
module.exports = function(app) {
    return function(req, res, next){
      var allowCrossDomain = function(req, res) {
        res.header('Access-Control-Allow-Origin','http://localhost:8100');
          res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
          res.header('Access-Control-Allow-Headers', 'Content-Type');
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      }

      allowCrossDomain(req, res);

var base64Image;
var count=0;
app.models.Event.count( function(err, c) {
           count =c;
           console.log(count);

           fs.readFile(path, function(err, data) {
           if(data)
             base64Image = data.toString('base64');
             //console.log(base64Image);
             //console.log(base64Image);
           //  var decodedImage = new Buffer(base64Image, 'base64');
           //  fs.writeFile('D:\\mohsen\\documents\\epsi\\photoDecoded.jpg', decodedImage, function(err) {});



           var event = new app.models.Event({
               title: req.body.title,
               desc:req.body.desc,
               date:req.body.date,
               userId: req.session.userId,
               particips:req.session.userId,
               category:req.body.category,
               num :count+1,
               img: {
                 data :req.body.img.data
               }

           });

           event.save(function(err, instance){
               if(err)
                   return res.status(500).send(err);
               res.send(instance);
           })

           });

      })

    }
};
