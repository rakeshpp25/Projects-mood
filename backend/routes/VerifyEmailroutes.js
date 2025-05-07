import express from "express";
const router = express.Router();
import usermodel from "../models/usersignup.js";
import BusinessModel from "../models/BusinessSignup.js";
import OtpModel from "../models/otpmodel.js";
import { generatetoken } from "../middleware/auth.js";

router.post("/", async (req, res) => {
  try {
    const { verificationCode, email: useremail, role, purpose } = req.body;


    const Model = role === "business" ? BusinessModel : usermodel;

    // 1. Find the latest OTP for this email-role-purpose
    const otpEntry = await OtpModel.findOne({
      email: useremail,
      role,
      purpose,
    }).sort({ createdAt: -1 });

    if (!otpEntry) {
      return res.status(404).json({ message: "OTP not found or expired." });
    }

    // 2. Check OTP expiry (5 mins)
    const now = new Date();
    const otpAge = now - otpEntry.createdAt;
    if (otpAge > 300000) {
      await OtpModel.deleteOne({ _id: otpEntry._id });
      return res.status(410).json({ message: "OTP has expired. Please request a new one." });
    }

    // 3. Match OTP
    if (otpEntry.code !== verificationCode) {
      return res.status(401).json({ message: "Invalid OTP." });
    }

    // 4. Find user
    const user = await Model.findOne({ email: useremail });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // 5. Handle based on purpose
    if (purpose === "signup") {
      user.isverified = true;
      await user.save();
    } else if (purpose === "login") {
      if (!user.isverified) {
        return res.status(403).json({ message: "User is not verified. Please signup first." });
      }
    } else {
      return res.status(400).json({ message: "Invalid purpose provided." });
    }

    // 6. Delete OTP after successful verification
    await OtpModel.deleteOne({ _id: otpEntry._id });

    // 7. Generate JWT token
    const token = generatetoken(user);

    // 8. Set cookie and respond
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",

    });

    res.json({
      message: "Email verified successfully.",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export const verifyEmailroutes = router;
