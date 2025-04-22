import { Verification_Email_Template } from "./emailtemplate.js";
import { transporter } from "./emailConfig.js";
import dotenv from 'dotenv';
dotenv.config();
export const sendVerificationCode = async (email, verification_code) => {
  try {
    const htmlContent = Verification_Email_Template.replace("{verificationCode}", verification_code);
    const response = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`, // ✅ now from env
      to: email,
      subject: "Verify your email",
      text: "Verification code",
      html: htmlContent,
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};
