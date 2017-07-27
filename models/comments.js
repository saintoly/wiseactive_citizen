const mongoose     = require('mongoose'),
      Schema       = mongoose.Schema;


var commentSchema = new Schema({
	author: { type: Schema.Types.ObjectId, ref: 'user' }
	comment: String,
	created: {type: Date, default: Date.now},
	blog: { type: Schema.Types.ObjectId, ref: 'blog' }
});

var Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;