module.exports = function(app) {
    return function(req, res, next){
        app.models.Category.findOne({
                _id: req.params.id
            }, function(err, category){
                if(err)
                    return res.status(500).send(err);

                  if(category.events.length == 0){
                      category.remove(function(error , result){
                      res.send("the category is succecfully removed");

                    });
                  }else{
                    res.status(401).send("you can't remove this category. because the category is not empty");
                  }

            });
    }
};
