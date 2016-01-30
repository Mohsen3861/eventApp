var fs = require('fs');
var path = "D:\\MnM\\photo3.jpg"
module.exports = function(app) {
    return function(req, res, next){

var base64Image;
fs.readFile(path, function(err, data) {

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

    img: {
      data :base64Image
    }

});

event.save(function(err, instance){
    if(err)
        return res.status(500).send(err);
    res.send(instance);
})

});




    }
};
