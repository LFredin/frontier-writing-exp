//dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//schema
const UserSchema = new Schema({
  name : {
    type: String,
    required: true
  },
  email : {
    type: String,
    required: true
  },
  password : {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//make it seeable
module.exports = User = mongoose.model("users", UserSchema);
