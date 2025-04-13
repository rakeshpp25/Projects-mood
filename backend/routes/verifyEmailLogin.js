import express from "express";
const router = express.Router();
import usermodel from "../models/usersignup.js";

router.post("/", async (req, res) => {
  try {
   
    const verificationCode = req.body.verificationCode;
    const useremail = req.body.email;

    // Find the user by email
    const user = await usermodel.findOne({ email: useremail });
    
    // If user does not exist or OTP is incorrect
    if (!user) {
      return res.status(400).send("User not found.");
    }

    // Check if OTP has expired (TTL index does this automatically)
    if (Date.now() - user.otpCreatedAt > 300000) {
      // 5 minutes expiry
      return res.status(400).send("OTP has expired. Please request a new one.");
    }

    // Validate OTP
    if (user.verification_code !== verificationCode) {
      return res.status(400).send("Invalid OTP.");
    }

    // Mark the user as verified and save to the database
if(user.verification_code == verificationCode){
  user.otpExpiresAt = null;
  user.otpCreatedAt = null; 
  user.set("otpExpiresAt", undefined, { strict: false });
  await user.save();

  res.json("User email verified successfully.");
}
  } catch (error) {
    res.status(400).send("User not found kya kare");
  }
});
export const verifyEmailLogin = router;
