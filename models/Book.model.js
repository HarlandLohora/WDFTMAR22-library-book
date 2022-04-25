const { Schema, model } = require("mongoose")


const BookSchema = new Schema({
  title: String,
  description: String,
  author: String,
  rating: Number,
}, { timestamps: true });


module.exports = model("books", BookSchema)

