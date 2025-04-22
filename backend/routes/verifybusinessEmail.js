import express from "express";
const router = express.Router();
import BusinessModel from "../models/BusinessSignup.js";
import {generatetoken} from '../middleware/auth.js'

router.post("/", async (req, res) => {
  try {
   
    const verificationCode = req.body.verificationCode;
    const useremail = req.body.email;

    // Ensure email and OTP are provided
    // if (!useremail || !otp) {
    //   return res.status(400).send('Email and OTP are required.');
    // }

    // Find the user by email
    const Businessuser = await BusinessModel.findOne({ email: useremail });
   
    // If user does not exist or OTP is incorrect
    if (!Businessuser) {
      return res.status(404).json({ message: "User not found." });
    }


    // Check if OTP has expired (TTL index does this automatically)

    if (Date.now() - new Date(user.otpCreatedAt).getTime() > 300000) {
      return res.status(410).json({ message: "OTP has expired. Please request a new one." });
    }

    // Validate OTP
   if (Businessuser.verification_code !== verificationCode) {
      return res.status(401).json({ message: "Invalid OTP." });
    }

    // Mark the user as verified and save to the database
if(Businessuser.verification_code == verificationCode){
  
      Businessuser.isverified = true;
      Businessuser.otpExpiresAt = null;
      Businessuser.otpCreatedAt = null; 
      Businessuser.set("otpExpiresAt", undefined, { strict: false });
  await Businessuser.save();

  const token = generatetoken(Businessuser);

    res.cookie("token", token, {
      httpOnly: true,  // Ensures the cookie is not accessible via JavaScript
      secure: process.env.NODE_ENV === "production", // Set to true for HTTPS in production
      sameSite: "None", // Prevents cookie from being sent in cross-site requests
    
    });

  res.json("User email verified successfully.");
}
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
});
export const BusinessEmailroutes = router;
