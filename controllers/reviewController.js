import Review from './../model/Reviews.js';
import asyncHandler from "express-async-handler";
import Product from './../model/Product.js';
import User from './../model/User.js';


export const createReviewCtrl = asyncHandler(async(req,res) => {
 const {product, message, rating} = req.body
 const {productID} = req.params;
 const ProductFound = await Product.findById(productID).populate("reviews");
 if(!ProductFound){
  throw new Error("Product Not Found");
 }
 const hasReviewd = ProductFound?.reviews.find((re) => {
  return re?.user.toString() === req.user.toString();
 })
 if(hasReviewd){
  throw new Error("You have already reviewd this product")
 }
 const review = await Review.create({
  message,
  rating,
  product: ProductFound?._id,
  user: req.user,
 })
 ProductFound.reviews.push(review?._id);
 await ProductFound.save();
  res.json({
   message: "successfully",
   ProductFound
  })
});