const {
  productModel,
  supplierModel,
  companyModel,
} = require("../Models/db_connect");

const validators = require("../Utilities/validators");

exports.getCompanyDetails = async (req, res) => {
  try {
    const company = await companyModel.find();
    if (company.length > 0) {
      res.status(200).json({
        status: "success",
        companyDetails: company,
      });
    }
  } catch (error) {
    res.status("500").json({
      status: "fail",
      msg: "Unable to fetch company details. Please try later.",
    });
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    if (products.length > 0) {
      res.status(200).json({
        status: "success",
        products: products,
      });
    }
  } catch (error) {
    res.status("500").json({
      status: "fail",
      msg: "Unable to fetch products. Please try later.",
    });
  }
};
exports.getProductDetailByName = async (req, res) => {
  try {
    const product = await productModel.findOne({ name: req.params.product });
    if (product != null) {
      res.status(200).json({
        status: "success",
        result: product,
      });
    } else {
      res.status(400).json({
        status: "fail",
        msg: "This medicine is not manufactured by XYZ Pharma",
      });
    }
  } catch (error) {
    res.status("500").json({
      status: "error",
      msg: error.message,
    });
  }
};
exports.addQuaterlyResult = async (req, res) => {
  try {
    const companies = await companyModel.find();
    if (companies.length > 0) {
      const companyDetails = companies[0].quaterDetails;
      let availableQuater = [];
      console.log(companyDetails[0]);
      const result = companyDetails.filter((e) => {
        availableQuater.push(e.quater);
        console.log(e.quater, `${req.body.quater}, ${req.body.fyear}`);
        return e.quater == `${req.body.quater}, ${req.body.fyear}`;
      });
      if (result.length == 1) {
        res.status(200).json({
          status: "success",
          QuaterlyResult: result[0].result,
        });
      } else {
        res.status(400).json({
          status: "fail",
          msg: `Currently available quater details are of: ${availableQuater} `,
        });
      }
    } else {
      res.status(400).json({
        status: "fail",
        msg: "Unable to fetch company details. Please try later.",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: "Network error. Please try again.",
    });
  }
};
exports.contactOfCompany = async (req, res) => {
  try {
    const companies = await companyModel.find();
    if (companies.length > 0) {
      if (companies[0].contactUs) {
        res.status(200).json({
          status: "success",
          "Details to": companies[0].contactUs,
        });
      } else {
        res.status(400).json({
          status: "fail",
          msg: "Unable to fetch Company Details. Please try later.",
        });
      }
    } else {
      res.status(400).json({
        status: "fail",
        msg: "No company is registered yet.",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
};
exports.registerSupplier = async (req, res) => {
  try {
    const supplier = await supplierModel.findOne({
      companyName: req.body.companyName,
    });
    if (supplier == null) {
      if (validators.dateValidator(req.body.dor)) {
        let registerDate = req.body.dor.split("/");
        let modifiedDOR = new Date(
          registerDate[2],
          registerDate[1],
          registerDate[0]
        );
        if (modifiedDOR < new Date()) {
          res.status(400).json({
            status: "fail",
            msg: "Date of register should not be less than today",
          });
        } else {
          const newSupplier = await supplierModel.create(req.body);
          res.status(200).json({
            status: "success",
            msg: "Supplier registration successful",
          });
        }
      } else {
        res.status(400).json({
          status: "fail",
          msg: "Date should be in format dd/mm/yyyy",
        });
      }
    } else {
      res.status(400).json({
        status: "fail",
        msg: "Supplier have already registered!",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
};
exports.updateSupplierContactNumber = async (req, res) => {
  try {
    const supplier = await supplierModel.findOne({
      companyName: req.body.companyName,
    });
    if (supplier != null) {
      const updatedSupplier = await supplierModel.findOneAndUpdate(
        { companyName: req.body.companyName },
        { contactNumber: req.body.contactNumber },
        { new: true, runValidators: true }
      );
      res.status(200).json({
        status: "success",
        msg: "Supplier contact number updated successfully",
      });
    } else {
      res.status(400).json({
        status: "fail",
        msg: "Supplier doesn't exist!! Please check your credentials",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await supplierModel.findOne({
      companyName: req.body.companyName,
    });
    if (supplier != null) {
      const deletedSupplier = await supplierModel.deleteOne({
        companyName: req.body.companyName,
      });
      if (deletedSupplier.deletedCount) {
        res.status(400).json({
          status: "fail",
          msg: "Deletion Successful, Supplier removed",
        });
      }
    } else {
      res.status(400).json({
        status: "fail",
        msg: "Supplier doesn't exist. Please check your credentials",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
};

exports.defaultController = async (req, res) => {
  res.status(500).json({
    msg: "Invalid Path! Please check the url.",
  });
};
