import express from 'express';
import { isLoggedIn } from './../middlewares/isLogged.js';
import { createReviewCtrl } from './../controllers/reviewController.js';
const reviewRouter = express.Router();

reviewRouter.post("/:productID", isLoggedIn, createReviewCtrl)

export default reviewRouter;
