import express from 'express';
const productRouter = express.Router();
import { createProduct, getProduct, getProductCtrl, updateProduct, deleteProduct
 } from './../controllers/productController.js';

 
import { isLoggedIn } from './../middlewares/isLogged.js';
productRouter.post('/', isLoggedIn, createProduct)
productRouter.get('/', getProduct)
productRouter.get('/:id', getProductCtrl)
productRouter.put('/:id', isLoggedIn, updateProduct)
productRouter.delete('/:id', isLoggedIn, deleteProduct)

export default productRouter;

