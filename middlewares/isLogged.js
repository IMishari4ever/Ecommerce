import { getTokenFromTheHeader } from './../utils/getTokenFromTheHeader.js';
import { verifyToken } from './../utils/verifyToken.js';

export const isLoggedIn = (req, res, next) => {
 const token = getTokenFromTheHeader(req)
 const decodedUser = verifyToken(token);
 if(!decodedUser){
  throw new Error(`Invalid/Expired token, please login again`)
 } else {
  req.user = decodedUser?.id;
  next();
 }
}