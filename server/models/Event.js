module.exports = function(app){
  var EventSchema = app.mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    userId: {
      type: app.mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    particips:{
      type:[app.mongoose.Schema.Types.ObjectId],
      ref:'User'
    },
    category:{
      type : String,
      required : true
    },
    img: {
      data: String,
    },
    num:{
      type: Number,
      required: true
    }
    /*
    ,
    id:{
    type:app.mongoose.Schema.ObjectId,
    required:true
  }
  */

});

EventSchema.plugin(require('mongoose-timestamp'));

var Event = app.mongoose.model('Event', EventSchema);
return Event;
};
