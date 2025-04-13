import express from "express";
const router = express.Router();
import usermodel from "../models/usersignup.js";
import BusinessModel from "../models/BusinessSignup.js"; // Your Business Model

router.get("/",  async (req, res) => {
      try {
        const { id, email } = req.userpayload; // Access the user information from req.userpayload
    
        let user;
        // Try to find the user in the UserModel first
        user = await usermodel.findById(id).select("-__v");
    
        // If not found in UserModel, check in BusinessModel
        if (!user) {
          user = await BusinessModel.findById(id).select("-__v");
        }
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        console.log("User data:", user);
        res.json(user);
      } catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).json({ message: "Server error" });
      }
    });

export const profile= router
