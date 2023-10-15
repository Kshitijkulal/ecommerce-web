import express from "express";
import { getProductController, getProductsController, productCreationController, productDeletionController, productPhotoController, productUpdationController } from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

// routes

router.post(
  `/create-product`,
  requireSignIn,
  isAdmin,
  formidable(),
  productCreationController
);

// update product

router.put(
  `/update-product/:pid`,
  requireSignIn,
  isAdmin,
  formidable(),
  productUpdationController
);

// get products

router.get(`/get-products`,getProductsController);


// single product
router.get(`/get-product/:slug`,getProductController);

// get photo

router.get(`/product-photo/:pid`,productPhotoController);

// delete product

router.delete(`/delete-product/:pid`,requireSignIn,isAdmin,productDeletionController);


// delete product image
router.delete(`/delete-product-photo/:pid`,productDeletionController);



export default router;