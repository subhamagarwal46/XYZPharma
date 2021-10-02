const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  companyName: { type: String, required: true, unique: true },
  officialEmailId: {
    type: String,
    unique: true,
    required: true,
    validate: [
      function (v) {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        );
      },
      "Email Id is invalid",
    ],
  },
  contactNumber: {
    type: Number,
    validate: [
      function (v) {
        return /^\d{10}$/.test(v);
      },
      "Phone number should have 10 digits",
    ],
  },
  durationOfContract: {
    type: Number,
    min: [1, "Duration cannot be less than 1"],
  },
  dor: {
    type: String,
    validate: [
      function (v) {
        return /^[0-3][0-9]\/[0-1][0-9]\/\d{4}$/.test(v);
      },
      "Date should be in format dd/mm/yyyy",
    ],
  },
});

module.exports = supplierSchema;
