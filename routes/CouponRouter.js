import express from "express";
import { createCouponControl, getAllCouponsCtrl, getCouponCtrl, updateCoupon, deleteCoupon } from './../controllers/Coupon-Manager.js';
import { isLoggedIn } from './../middlewares/isLogged.js';
const couponsRouter = express.Router();

couponsRouter.post("/",isLoggedIn, createCouponControl);

couponsRouter.get("/", getAllCouponsCtrl);
couponsRouter.delete("/delete/:id", isLoggedIn, deleteCoupon);
couponsRouter.put("/update/:id", isLoggedIn, updateCoupon);
couponsRouter.get("/:id", getCouponCtrl);

export default couponsRouter;