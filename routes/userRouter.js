import express from 'express';
import { registerUserController, loginUserCtrl, getUserProfileCtrl } from './../controllers/userController.js';
import { isLoggedIn } from './../middlewares/isLogged.js';
const userRoutes = express.Router();

userRoutes.post('/register', registerUserController);
userRoutes.post('/login', loginUserCtrl);
userRoutes.get('/profile', isLoggedIn, getUserProfileCtrl);

export default userRoutes;
