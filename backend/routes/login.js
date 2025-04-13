import express from "express";
const router = express.Router();
import usermodel from "../models/usersignup.js";
import businessmodel from "../models/BusinessSignup.js";
import OtpModel from "../models/otpmodel.js"; // Separate OTP model
import { sendVerificationCode } from "../middleware/email.js";

router.post("/", async (req, res) => {
  try {
    const { useremail } = req.body;

    if (!useremail) {
      return res.status(400).send("All fields (useremail) are required");
    }

    // Check in the relevant models based on email
    let existsUser = await usermodel.findOne({ email: useremail });
    let role = "user";
    if (!existsUser) {
      existsUser = await businessmodel.findOne({ email: useremail });
      role = "business";
    }
    
    if (!existsUser) {
      return res.status(400).send("USER NOT FOUND, PLEASE REGISTER");
    }

    // Generate a random 6-digit OTP
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Create an OTP entry in OtpModel with purpose "login"
    const otpEntry = new OtpModel({
      email: useremail,
      code: verificationCode,
      purpose: "login",
      role: role,
    });
    await otpEntry.save();

    console.log("OTP generated for email:", useremail);

    // Send the OTP to the user's email
    await sendVerificationCode(useremail, verificationCode);

    // Return a success response with email and role so that the frontend can use them in OTP verification
    res.status(200).json({
      message: "OTP sent successfully. Please verify your email.",
      email: useremail,
      role: role,
    });
  } catch (error) {
    console.error("Error during login OTP process:", error);
    res.status(500).send("An error occurred during login.");
  }
});

router.get("/", (req, res) => {
  res.redirect("http://localhost:5173/");
});

export const login = router;
