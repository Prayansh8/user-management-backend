const mongoose = require('mongoose');
const { db } = require('../config');

mongoose.connect(db.uri);

var Schema = mongoose.Schema;

var postSchema = new Schema({
  name: {
    type: String,
  },
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date, default: Date.now,
  },
  updatedAt: {
    type: Date, default: Date.now,
  },
  createdBy: {
      type: Schema.Types.ObjectId, 
      ref: 'User'
  }
});

const postmodel = mongoose.model("post", postSchema);
module.exports = { postmodel }
