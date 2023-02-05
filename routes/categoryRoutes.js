import express from "express";
import { createCategoryCtrl, getSingleCategoriesCtrl, getAllCategoriesCtrl, deleteCategory, updateCategories} from './../controllers/categoriesCtrl.js';
import { isLoggedIn } from './../middlewares/isLogged.js';
const categoriesRouter = express.Router();

categoriesRouter.post('/', isLoggedIn, createCategoryCtrl)
categoriesRouter.get('/', getAllCategoriesCtrl)
categoriesRouter.get('/:id', getSingleCategoriesCtrl)
categoriesRouter.delete('/:id', isLoggedIn, deleteCategory)
categoriesRouter.put('/:id', isLoggedIn, updateCategories)

export default categoriesRouter;