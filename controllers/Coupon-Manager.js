import asyncHandler from 'express-async-handler';
import Coupon from './../model/Coupon.js';

export const createCouponControl = asyncHandler(async(req,res) => {
 const {code, startDate, endDate, discount} = req.body;
 const couponsExists = await Coupon.findOne({
  code,
 })
 if(couponsExists){
  throw new Error('Coupon exists');
 }
 if(isNaN(discount)){
  throw new Error('discount value must be a number');
 }

 const coupon = await Coupon.create({
  code, startDate, endDate, discount, user: req.user
 })
 res.json({
  status: "success",
  message: "Coupon created successfully",
  coupon,
 });
});

export const getAllCouponsCtrl = asyncHandler(async(req,res) => {
 const coupons = await Coupon.find();
 res.json({
  status: "successfully",
  message: "All Coupons",
  coupons
 })
})

export const getCouponCtrl = asyncHandler(async(req,res) => {
 const coupon = await Coupon.findById(req.params.id)
 res.json({
  status: "successfully",
  message: "Coupon fetched",
  coupon
 });
}) 

export const updateCoupon = asyncHandler(async(req,res) => {
  const {code, startDate, endDate, discount} = req.body;
 const coupon = await Coupon.findByIdAndUpdate(req.params.id, {
  code: code?.toUpperCase(),
  discount,
  startDate,
  endDate,
 }, {
  new: true,
 })
 res.json({
  status: "success",
  message: "Coupon updated successfully",
  coupon,
 })
}) 

export const deleteCoupon = asyncHandler(async(req,res) => {
 const coupon = await Coupon.findByIdAndDelete(req.params.id)
 res.json({
  status: "success",
  message: "Coupon updated successfully",
 })
}) 