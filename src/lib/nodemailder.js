import nodemailer from "nodemailer";

export const SendEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,       // use TLS port
      secure: false,   // false for TLS
      auth: {
        user: process.env.App_Email,     // Gmail
        pass: process.env.App_Passward, // App Password
      },
      tls: {
        rejectUnauthorized: false,       // allow cloud SSL cert
      },
    });

    const mailOptions = {
      from: `"Mystery Messages" <${process.env.App_Email}>`,
      to: email,
      subject: "Your OTP Code for Mystery Messages",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #6f42c1;">Mystery Messages Verification</h2>
          <p>Hello,</p>
          <p>Your One-Time Password (OTP) is:</p>
          <h1 style="background: #6f42c1; color: white; 
                     display: inline-block; padding: 10px 20px; 
                     border-radius: 8px;">
            ${otp}
          </h1>
          <p>This OTP is valid for 5 minutes. Do not share it with anyone.</p>
          <p style="margin-top: 20px; color: gray;">
            Regards,<br />
            The Mystery Messages Team
          </p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully:", result.messageId);
    return { success: true, result };
  } catch (error) {
    console.error("Failed to send OTP:", error);
    return { success: false, error };
  }
};
