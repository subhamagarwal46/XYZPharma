const express = require("express");
const controller = require("../Controllers/xyzController");

const router = express.Router();

router.get("/home", controller.getCompanyDetails);
router.get("/products", controller.getAllProducts);
router.get("/productDetails/:product", controller.getProductDetailByName);
router.post("/quaterlyResult", controller.addQuaterlyResult);
router.get("/contactus", controller.contactOfCompany);
router.post("/supplierRegister", controller.registerSupplier);
router.put(
  "/supplierUpdateContactNumber",
  controller.updateSupplierContactNumber
);
router.delete("/supplierRemove", controller.deleteSupplier);
router.all("*", controller.defaultController);

module.exports = router;
