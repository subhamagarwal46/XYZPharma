const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  address: { type: String },
  businessHours: { type: String },
  contactNumber: { type: Number },
});

const quaterSchema = new mongoose.Schema({
  sales: { type: Number },
  otherIncome: { type: Number },
  grossProfit: { type: Number },
  depriciation: { type: Number },
  interest: { type: Number },
  tax: { type: Number },
  netProfit: { type: Number },
});

const quaterDetailsSchema = new mongoose.Schema({
  quater: { type: String },
  result: { type: quaterSchema },
});

const companySchema = new mongoose.Schema({
  whyUS: { type: String },
  vision: { type: String },
  mission: { type: String },
  contactUs: { type: addressSchema },
  quaterDetails: { type: [quaterDetailsSchema] },
});

module.exports = companySchema;
