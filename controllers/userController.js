import User from "../model/User.js";
import bcrypt from "bcryptjs"
import generateToken from './../utils/generateToken.js';
import { getTokenFromTheHeader } from './../utils/getTokenFromTheHeader.js';
import { verifyToken } from './../utils/verifyToken.js';
export const registerUserController = async(req,res) => {
 const {fullname, email, password} = req.body;
 const userExists = await User.findOne({email})

 if(userExists){
  res.json({
   msg: 'User already exist',
  });
 }
 // hash password
 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(password, salt)
 // create the user
 const user = await User.create({
  fullname, email, password: hashedPassword
 });
 res.status(201).json({
  staus: 'success',
  messaage: "User Registerd Successfully",
  data: user,
 })
};

export const loginUserCtrl = async (req, res) => {
 const {email, password} = req.body;
 const userFound = await User.findOne({
  email,
 })
 
 if(userFound && (await bcrypt.compare(password, userFound?.password))) {
  res.json({
   status: "Success",
   messaage: "User logged-in successfully",
   userFound,
   token: generateToken(userFound?._id)
  })
 } else {
      throw new Error("Invalid login credentials");
 }
}

export const getUserProfileCtrl = async (req,res) => {
  const token = getTokenFromTheHeader(req)
  const verified = verifyToken(token);
  console.log(verified)
  console.log(token)
  res.json({
  msg: "Profile Paage",
 })
}