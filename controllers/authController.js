import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body; // Corrected req.body
        // validations
        if (!name) {
            return res.status(400).json({ error: "name is required" }); // Use return to prevent multiple responses
        }
        if (!email) {
            return res.status(400).json({ error: "email is required" });
        }
        if (!password) {
            return res.status(400).json({ error: "password is required" });
        }
        if (!phone) {
            return res.status(400).json({ error: "phone number is required" });
        }
        if (!address) {
            return res.status(400).json({ error: "address is required" });
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(200).json({
                success: true,
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
            phone,
        }).save();
        

        res.status(201).json({
            success: true,
            message: "You have successfully registered",
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in registration",
            error,
        });
    }
};
