import express from "express";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  productSearchController,
  similiarProductsController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//create a product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//update a product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get all products
router.get("/get-product", getProductController);

//get a particular product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete
router.delete(
  "/product-delete/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//get products by filters
router.post("/product-filters", productFilterController);

//count product
router.get("/product-count", productCountController);

//products per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", productSearchController);

//similiar product
router.get("/related-product/:pid/:cid", similiarProductsController);

//category wise product find
router.get("/product-category/:slug", productCategoryController);

//payment routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);
export default router;
