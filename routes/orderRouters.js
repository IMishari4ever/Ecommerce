import express from "express";
import { createOrder } from './../controllers/order.js';
import { isLoggedIn } from './../middlewares/isLogged.js';
const orderRouter = express.Router();
orderRouter.post('/',isLoggedIn, createOrder)
export default orderRouter