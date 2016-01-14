module.exports = function(app) {
    return function(req, res, next){
        console.log(req.session.userId);
        var event = new app.models.Event({
            title: req.body.title,
            desc:req.body.desc,
            date:req.body.date,
            userId: req.session.userId
        });

        event.save(function(err, instance){
            if(err)
                return res.status(500).send(err);
            res.send(instance);
        })
    }
};
