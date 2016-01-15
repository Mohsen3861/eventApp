module.exports = function(app){
  var CategorySchema = app.mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    userId: {
      type: app.mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    events:{
      type:[app.mongoose.Schema.Types.ObjectId],
      ref:'Event'
    }
  });

  CategorySchema.plugin(require('mongoose-timestamp'));

  var Category = app.mongoose.model('Category', CategorySchema);
  return Category;
};
