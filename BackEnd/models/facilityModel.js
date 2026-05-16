const mongoose = require("mongoose");

const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
}, { timestamps: false });

module.exports = mongoose.model("facility", facilitySchema);
