import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: `Name is required` });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: `Category Already Exists`,
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: `new category created`,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: `Error in category`,
    });
  }
};

// update category

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: `Updated Category Successfully`,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: `Error in Updating Category`,
    });
  }
};

// get all categories

export  const categoriesController = async (req,res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success:true,
      message:`All categories List`,
      category,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:`Failed to display categories`,
      error
    })
  }
}

// get single category

export const categoryController = async (req,res) => {

  try {
    const category = await categoryModel.findOne({slug:req.params.slug})
    res.status(200).send({
      success:true,
      message:`Success`,
      category
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success:false,
      message:`Failed to load category`,
      error
    })
  }
}

// delete category controller

export const categoryDeletioncontroller = async (req,res) => {
  try {
    const {id} = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success:true,
      message:`Deleted Category Successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:`Encountered an error while deleting category`,
      error
    });
  }
}