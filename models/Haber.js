const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const haberSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: [
      "gundem",
      "spor",
      "video",
      "ekonomi",
      "magazin",
      "teknoloji",
      "saglik",
      "otomobil",
    ],
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Haber", haberSchema);
