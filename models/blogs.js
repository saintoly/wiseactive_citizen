const mongoose     = require('mongoose'),
      Schema       = mongoose.Schema;


var blogSchema = new Schema({
//	author: [{ type: Schema.Types.ObjectId, ref: 'user' }]
	author: String,
	comment: String,
	created: {type: Date, default: Date.now},
//	comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }]
});

var Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;