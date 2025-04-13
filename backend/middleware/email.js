import { Verification_Email_Template } from "./emailtemplate.js";
import { transporter } from "./emailConfig.js";

export const sendVerificationCode =async (email,verification_code) =>{
      try {
            const htmlContent = Verification_Email_Template.replace("{verificationCode}", verification_code);
            const response = await transporter.sendMail({
                  from: '"code by mood" <risermoon0@gmail.com>', // sender address
                  to: email, // list of receivers
                  subject: "verify your email", // Subject line
                  text: "verification code", // plain text body
                  html: htmlContent // html body
                });
                console.log("email send successfully",response)
      } catch (error) {
            console.log(error)
      }
}