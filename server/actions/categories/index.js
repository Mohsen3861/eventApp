module.exports = function(app){
    return {
        create: require('./create')(app),
        list: require('./list')(app),
        remove: require('./remove')(app),
        show: require('./show')(app),
        edit: require('./edit')(app),
        addEvent:require('./addEvent')(app),
        removeEvent:require('./removeEvent')(app)

    };
};
