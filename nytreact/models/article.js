const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    trim: true,
    unique: [true, 'Article already saved']
  },
  date: {
    type: Date,
    default: Date.now
  },
  thumbnail: {
    type: String
  },
  snippet: {
    type: String,
  },
  url: {
    type: String,
  }
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
