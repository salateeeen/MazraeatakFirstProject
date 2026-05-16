const mongoose = require("mongoose");
const { timestamps } = require("../utils/schemaOptions");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
},
  { timestamps: false });

module.exports = mongoose.model("category", categorySchema);