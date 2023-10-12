import express from "express";
import { productCreationController } from "../controllers/productController.js";
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

export default router;