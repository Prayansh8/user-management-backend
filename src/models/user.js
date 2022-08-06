const mongoose = require('mongoose');
const { db } = require('../config');

mongoose.connect(db.uri);

var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  gender: {
    type: String,
    
  },
  img: {
    type: String
  },
  password: {
    type: String,
  },
});

const usermodel = mongoose.model("User", userSchema);
module.exports = { usermodel }
