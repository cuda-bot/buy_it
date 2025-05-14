import express from "express";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//registering a category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//updating a category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//fetching all categories
router.get("/get-category", categoryController);

//fetch a particular category
router.get("/single-category/:slug", singleCategoryController);

//delete a category
router.delete("/delete-category/:id", deleteCategoryController);

export default router;
