import jwt from 'jsonwebtoken';

const generateToken = (id) => {
 return jwt.sign({id}, 'uew9sdjs', {expiresIn: "3d"})
};

export default generateToken;