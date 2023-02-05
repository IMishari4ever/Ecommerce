import asyncHandler from "express-async-handler";
import Order from './../model/Order.js';
import User from './../model/User.js';
import Product from './../model/Product.js';
import app from './../app/app.js';
import Coupon from './../model/Coupon.js';

export const createOrder = asyncHandler(async(req,res) => {
 const {orderItems, shippingAddress, totalPrice} = req.body;
 const {coupon} = req.query;
  const couponFound = await Coupon.findOne({
   code: coupon?.toUpperCase(),
  })
 if(couponFound?.isExpired){
  throw new Error("Coupon has expired");
 }
  if(!couponFound){
  throw new Error("Coupon is NOT exist");
 }
 const discount = couponFound?.discount / 100;
 const user = await User.findById(req.user);
 if(orderItems?.length <=0){
  throw new Error("No order items");
 };
 const order = await Order.create({
  user: user?._id,
  orderItems,
  shippingAddress,
  totalPrice: couponFound ? totalPrice - totalPrice * discount : totalPrice
 });
 user.orders.push(order?._id);
 await user.save();
})