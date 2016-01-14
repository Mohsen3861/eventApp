module.exports = function(app){
    var UserSchema = app.mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        nom: {
            type: String,
            required: true
        },
        prenom: {
            type: String,
            required: true
        }
    });

    UserSchema.plugin(require('mongoose-timestamp'));

    var User = app.mongoose.model('User', UserSchema);
    return User;
};
