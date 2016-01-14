module.exports = function(app) {
    return function(req, res, next){
      console.log("deleted : "+req.params.id);

        app.models.Event.findOneAndRemove({
                _id: req.params.id
            }, function(err, result){
                if(err)
                    return res.status(500).send(err);

                res.send(result);
            });
    }
};
