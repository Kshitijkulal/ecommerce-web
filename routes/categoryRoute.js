import express from "express";
import { categoriesController, categoryController, categoryDeletioncontroller, createCategoryController, updateCategoryController } from "../controllers/categoryController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();
// routes


// create category
router.post(`/create-category`,requireSignIn,isAdmin,createCategoryController);

// update category

router.put('/update-category/:id', requireSignIn,isAdmin,updateCategoryController);

// get all category

router.get('/categories/:id',categoriesController);

// get single category

router.get(`/get-category/:slug`,categoryController);

// delete category
router.delete(`/delete-category/:id`,requireSignIn,isAdmin,categoryDeletioncontroller);


export default router;