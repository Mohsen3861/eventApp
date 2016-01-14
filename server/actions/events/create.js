module.exports = function(app) {
    return function(req, res, next){
        console.log(req.body.title);
        var event = new app.models.Event({
            title: req.body.title,
            desc:req.body.desc,
            date:req.body.date,
            userId: req.session.userId,
            particips:req.session.userId,
            category:req.body.category

        });

        event.save(function(err, instance){
            if(err)
                return res.status(500).send(err);
            res.send(instance);
        })
    }
};
