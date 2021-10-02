const mongoose = require("mongoose");
const companySchema = require("./company");
const productSchema = require("./product");
const supplierSchema = require("./supplier");

mongoose.connect("mongodb://localhost:27017/XYZPharma").then(() => {
  console.log("Database connected");
});

const productModel = mongoose.model("product", productSchema);
const supplierModel = mongoose.model("supplier", supplierSchema);
const companyModel = mongoose.model("company", companySchema);

module.exports = { productModel, supplierModel, companyModel };
