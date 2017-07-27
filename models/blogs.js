const mongoose     = require('mongoose'),
      Schema       = mongoose.Schema;


var blogSchema = new Schema({
	author: String,
	comment: String,
	created: {type: Date, default: Date.now},
	comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }]
});

var Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;