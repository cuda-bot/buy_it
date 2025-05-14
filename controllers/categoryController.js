import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(401)
        .send({ message: "name of the category is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({ message: "category already exists" });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "category created successfully",
      category,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "category making went wrong", error });
  }
};

//update
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.status(201).send({
      success: true,
      message: "category updated successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

//fetch all categories
export const categoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "all categories fetched",
      categories,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "some error fetching", error });
  }
};

//fetch a particular category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    if (!category) {
      return res
        .status(400)
        .send({ success: false, message: "category not found" });
    }
    res.status(201).send({
      success: true,
      message: "category found successfully",
      category,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "something went wrong getting a single category",
      error,
    });
  }
};

//delete a category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res
      .status(201)
      .send({ success: false, message: "category deleted successfully" });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "something went wrong deleting category",
      error,
    });
  }
};
