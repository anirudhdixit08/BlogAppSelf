import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Authenticate -- check if user or admin is logged in
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("middleware : ",token);
    if(!token){
        return res.status(401).json({ error: "User not Authenticated !" });
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if(!user){
        return res.status(401).json({ error: "User not found !" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error Authentication Failed !");
    return res.status(401).json({ error: "User not Authenticated !" });
  }
};

// Authorize -- check if its the admin
export const isAdmin = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message : "User with given role not allowed!"});
        }
        next();
    }
}