import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    //create a hased token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(
            userId,
            {
              verifyToken: hashedToken,
              verifyTokenExpiry: Date.now() + 3600000,
            });
    }else if(emailType === "RESET"){
        await User.findByIdAndUpdate(
            userId,
            {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
    }
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "b96b3f44b12d84",
          pass: "3004ac942d54c1"
        }
      });

      const mailOptions = {
        from: 'aswinashokan@gmail.com',
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      }
    
  } catch (error) {
    throw new Error(error.message);
  }
};
