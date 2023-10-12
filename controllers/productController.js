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
            case photo && photo.size > 100000:
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
