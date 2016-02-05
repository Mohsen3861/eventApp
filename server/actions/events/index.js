module.exports = function(app){
    return {
        create: require('./create')(app),
        list: require('./list')(app),
        remove: require('./remove')(app),
        show: require('./show')(app),
        edit: require('./edit')(app),
        addParticipant: require('./addParticipant')(app),
        removeParticipant: require('./removeParticipant')(app),
        page : require('./page')(app)
    };
};
