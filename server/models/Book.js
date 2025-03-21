const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" }
});

const BookModel = mongoose.model("books", BookSchema);
module.exports = BookModel;