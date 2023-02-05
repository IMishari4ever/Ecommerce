import express from 'express';
import dbConnect from './../config/dbConnect.js';
import userRoutes from '../routes/userRouter.js'
import productRouter from './../routes/productRouter.js';
import categoriesRouter from './../routes/categoryRoutes.js';
import brandRouter from './../model/Brand.js';
import reviewRouter from './../routes/reviewRouter.js';
import orderRouter from './../routes/orderRouters.js';
import couponsRouter from './../routes/CouponRouter.js';
dbConnect();
const app = express();
app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/brans', brandRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/coupons', couponsRouter);

export default app;
