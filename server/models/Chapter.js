//dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//schema
const ChapterSchema = new Schema({
  title : {
    type: String,
    required: true
  },
  content : {
    type: String,
  },
  contributors : {
    type: [String]
  }
});

module.exports = ChapterSchema; //?? to make other schema use it
//module.exports = Chapter = mongoose.model('chapters', ChapterSchema);

