import express from "express";
const router = express.Router();
import usermodel from "../models/usersignup.js";
import BusinessModel from "../models/BusinessSignup.js";
import jwt from "jsonwebtoken";
import {verifytoken} from "../middleware/auth.js";                                                     

router.get("/",  async (req, res) => {
      try {
        const token = req.cookies.token; // Get token from cookies

        if (!token) {
          return res.status(401).json({ message: "No token found" });
        }
    
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.id; 

      let  user = await usermodel.findById(id).select("-__v");
    
        // If not found in UserModel, check in BusinessModel
        if (!user) {
          user = await BusinessModel.findById(id).select("-__v");
        }
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
       const userProfile = {
        library_name :user.library_name,
      name: user.name,
      gender: user.gender,
      email_address: user.email,
      aadharNumber: user.aadharNumber,
      mobile_no: user.mobile_no,
      altMobileNumber: user.altMobileNumber,
      city: user.city,
    };
    
    res.json(userProfile);
      } catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).json({ message: "Server error" });
      }
    });

router.put("/", verifytoken,  async (req, res) => {
      try {
        const userId = req.userpayload.id; // Access user ID from the JWT payload (make sure 'id' is there)
        const updatedData = req.body;
    

        // Only update the fields that are provided in updatedData
        const updatedBusiness = await BusinessModel.findByIdAndUpdate(
          userId,
          { $set: updatedData }, // Set only the fields that have been changed
          { new: true }
        );
    
    
        // Respond with the updated business profile
        res.status(200).json(updatedBusiness);
      } catch (err) {
        console.error("Error updating business profile:", err);
        res.status(500).json({ message: "Server error while updating business profile" });
      }
    });
    
export const profile= router
