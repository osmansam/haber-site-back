const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baslikSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["gundem", "spor"],
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    // required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  imageWidth: {
    type: Number,
    // required: true,
  },
  imageHeight: {
    type: Number,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Baslik", baslikSchema);
