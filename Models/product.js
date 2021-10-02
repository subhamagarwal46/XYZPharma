const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  saltComposition: { type: String },
  about: { type: String },
  use: { type: [String] },
  sideEffects: { type: [String] },
});

module.exports = productSchema;
