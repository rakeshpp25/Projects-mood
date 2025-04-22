import express from "express";
const router = express.Router();
import usermodel from "../models/usersignup.js";
import BusinessModel from "../models/BusinessSignup.js";


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

    router.put("/", async (req, res) => {
      try {
        const userId = req.userpayload.id; // Access user ID from the JWT payload (make sure 'id' is there)
        const updatedData = req.body;
    
        console.log("Received profile update data:", updatedData);
    
        // Only update the fields that are provided in updatedData
        const updatedBusiness = await BusinessModel.findByIdAndUpdate(
          userId,
          { $set: updatedData }, // Set only the fields that have been changed
          { new: true }
        );
    
        console.log("Updated business profile:", updatedBusiness);
    
        // Respond with the updated business profile
        res.status(200).json(updatedBusiness);
      } catch (err) {
        console.error("Error updating business profile:", err);
        res.status(500).json({ message: "Server error while updating business profile" });
      }
    });
    
export const profile= router
