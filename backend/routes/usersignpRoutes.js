import express from "express";
const router = express.Router();
import usermodel from "../models/usersignup.js";
import OtpModel from "../models/otpmodel.js"; // new model
import BusinessModel from "../models/BusinessSignup.js";
import { sendVerificationCode } from "../middleware/email.js";

router.post("/", async (req, res) => {
  try {
    const { username, useremail, mobile_no, city ,role ,libraryname } = req.body;

    if (!role || (role !== "user" && role !== "business")) {
      return res.status(400).send("Invalid role. Must be 'user' or 'business'");
    } 

    let existingAccount;

    if (role === "user") {
      existingAccount = await usermodel.findOne({ email: useremail });
    } else if (role === "business") {
      existingAccount = await BusinessModel.findOne({ email: useremail });
    }
    
    if (existingAccount) {
      return res.status(400).send("Account with this email already exists. Please login.");
    }

// Generate OTP
const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

if (role === "user") {
  if (!username || !useremail || !mobile_no || !city) {
    return res.status(400).send("All user fields (username, useremail, mobile_no, city) are required");
  }

  const newUser = new usermodel({
    name: username,
    email: useremail,
    mobile_no,
    city,
    role,
    isverified: false,
  });
  await newUser.save();
}

if (role === "business") {
  if (!username || !useremail || !mobile_no || !city || !libraryname ) {
    return res.status(400).send("All business fields are required");
  }

  const newBusiness = new BusinessModel({
    name: username,
    email: useremail,
    mobile_no,
    city,
    library_name : libraryname,
    role,
    isverified: false,
  });
  await newBusiness.save();
}

// Save OTP
const otpEntry = new OtpModel({
  email: useremail,
  code: verificationCode,
  purpose: "signup",
  role,
});
await otpEntry.save();

await sendVerificationCode(useremail, verificationCode);

return res.status(200).json({
  message: "OTP sent to email",
  email: useremail,
});

} catch (error) {
console.error("Signup error:", error);
return res.status(500).send("Server error");
}
});

export const usersignupRoutes = router;
