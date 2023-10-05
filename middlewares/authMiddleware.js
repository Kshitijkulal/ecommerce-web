import  Jwt  from "jsonwebtoken";
import userModel from "../models/userModel.js";

// protected routes token base

export const requireSignIn = async (req,res,next) => {
    try {
    const decode = Jwt.verify(
        req.headers.authorization,
        process.env.JWT_SEC_KEY
        );
        
        console.log(decode);
        req.user = decode;
        next();
} catch (error) {
        res.status(401).send(`${error}`);
    }
}

// admin access middleware

export const isAdmin = async (req,res,next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:`unAuthorized access`
            });
        }
        else{
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            message:`Error in admin middleware`
        })
    }
}