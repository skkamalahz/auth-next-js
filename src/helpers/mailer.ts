import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

interface EmailParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

interface CustomError extends Error {
  code?: string;
  message: string;
}

export const sendEmail = async ({ email, emailType, userId }: EmailParams) => {
  try {
    // Create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
      port: parseInt(process.env.SMTP_PORT || "2525"),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || "noreply@example.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: emailType === "VERIFY" 
        ? `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
        : `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to reset your password or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/resetpassword?token=${hashedToken}</p>`,
    };
    
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;

  } catch (error: unknown) {
    const customError = error as CustomError;
    throw new Error(customError.message);
  }
};
