import { comparedPassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import  Jwt  from "jsonwebtoken";
import express from "express";
import { hash } from "bcrypt";

const app = express();

export const registerController = async (req, res) => {
    
    try {
        const { name, email, password,  address, question,answer } = req.body; // Corrected req.body
        // validations
        if (!name) {
            return res.status(400).json({ message: "name is required" }); // Use return to prevent multiple responses
        }
        if (!email) {
            return res.status(400).json({ message: "email is required" });
        }
        if (!password) {
            return res.status(400).json({ message: "password is required" });
        }
        // if (!phone) {
        //     return res.status(400).json({ message: "phone number is required" });
        // }
        if (!address) {
            return res.status(400).json({ message: "address is required" });
        }
        if (!question) {
            return res.status(400).json({ message: "Question is required" });
        }
        if (!answer) {
            return res.status(400).json({ message: "answer is required" });
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "You're already registered, please login",
            });
        }

        // Register the user
        const hashedPassword = await hashPassword(password);
        // Create a new user // Save the user to the database
        const user = await new userModel({
            name,
            email,
            password: hashedPassword,
            address,
            question,
            answer
        }).save();

        res.status(201).send({
            success: true,
            message: "You have successfully registered",
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error,
        });
    }
};
// post login 
export const loginController = async (req,res) => {
    try {
        const {email,password} = req.body;
        if (!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            });
        }
        // check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:`email is not registerd`
            })
        }
        // check password
        const match = await comparedPassword(password,user.password);
        if(!match){
            res.status(200).send({
                success:false,
                message:`Invalid password`
            });
        }
        // token
        const token = await Jwt.sign({_id:user._id}, process.env.JWT_SEC_KEY, {expiresIn:"7d",});
        res.status(200).send({
            success:true,
            message:`logged in successfully`,
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role:user.role
            },
            token,
        });
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        res.status(500).send({
            success: false,
            message:`Error in login`,
            error
        });
    }
};

// post Forgot Password

export const forgotPasswordController = async (req, res) => {
    try {
        const { email , answer, newPassword } = req.body;
        if(!email){
            res.status(404).send({
                message:`Email is required`,
            });
        }
        if(!answer){
            res.status(404).send({
                message:`Answer is required`,
            });
        }
        if(!newPassword){
            res.status(404).send({
                message:`New Password is required`,
            });
        }
        // check
        const user = await userModel.findOne({email,answer});
        // validation 
        if(!user){
            return res.status(404).send(
                {
                    success:false,
                    message:`wrong Email or Answer`
                }
            )
        }

        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password:hashed});
        res.status(200).send({
            success:true,
            message: `password Reset Successfully`,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:`Something went wrong`,
            error
        })
    }
}

//  test controleer
export const testController = async (req, res) =>{
    try{
    res.status(200).send(`hey man this is a protected route`);
    } catch(error){
        console.log(error);
        res.send(error);
    }
};
