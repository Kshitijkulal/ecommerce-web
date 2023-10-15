import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from 'slugify';

// product creation controoller

export const productCreationController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
    } = req.fields;
    const {photo} = req.files
    switch (true) {
        case !name:
            return res.status(500).send({
                success:false,
                error:`Name is Required`
            }); 
            case !description:
            return res.status(500).send({
                success:false,
                error:`description is Required`
            }); 
            case !price:
            return res.status(500).send({
                success:false,
                error:`price is Required`
            });
            case !category:
            return res.status(500).send({
                success:false,
                error:`category is Required`
            });
            case !quantity:
            return res.status(500).send({
                success:false,
                error:`quantity is Required`
            }); 
            case photo && photo.size > 10000000:
            return res.status(500).send({
                success:false,
                error:`Photo is Required and should be less than 1mb`
            });
    }
    const products = new productModel({...req.fields, slug:slugify(name)});
    if(photo){
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
        success:true,
        message:'Product Created Successfully',
        products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in creation of product :(`,
      error,
    });
  }
};
export const getProductsController = async (req,res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "AllProducts ",
      products,
      totalCount: products.length
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:true,
      message:`error in getting product`,
      error,
    });
  }
}

export const getProductController = async (req,res) => {
  try {
    const product = await productModel.findOne({slug:req.params.slug}).select("-photo");
    res.status(200).send({
      success:true,
      message:`Succesfully fetched the product`,
      product
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:true,
      message:`error in getting product`,
      error
    });
  }
}

export const productPhotoController = async (req,res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if(product.photo.data){
      res.set("Content-type",product.photo.contentType)
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:`error in fetching photo`,
      error
    });
  }
}

export const productDeletionController = async(req,res) => {
  try {
   await productModel.findByIdAndDelete(req.params.pid).select("-photo");
   res.status.send({
    success:true,
    message:`Deleted product successfully`
   });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:`Encountered an error while deleting product`,
      error
    })
  }
}

export const productUpdationController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};