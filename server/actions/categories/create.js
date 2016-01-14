module.exports = function(app) {
    return function(req, res, next){
        console.log(req.session.userId);
        var category = new app.models.Category({
            title: req.body.title,
            userId: req.session.userId,
        });

        category.save(function(err, instance){
            if(err)
                return res.status(500).send(err);
            res.send(instance);
        })
    }
};
