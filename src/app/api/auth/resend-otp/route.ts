import { NextRequest, NextResponse } from "next/server";
import ConnectDb from "@/src/lib/db";
import UserModel from "@/src/models/User";
import { generate6DigitOtp, hashOtp } from "@/src/helpers/otp";
import { resend } from "@/src/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    await ConnectDb();

    // Find user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Generate new OTP
    const newOtp = generate6DigitOtp();
    const newOtpHash = await hashOtp(newOtp);
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update user with new OTP & expiry
    user.Otp = newOtpHash;
    user.otpExpiry = expiry;
    await user.save();

    // Send OTP via email
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: "Your new verification code",
      html: `
        <h2>Verify your email</h2>
        <p>Your 6-digit code is:</p>
        <h1 style="letter-spacing: 6px;">${newOtp}</h1>
        <p>This code expires in 10 minutes.</p>
      `,
    });

    return NextResponse.json({
      ok: true,
      message: "New OTP sent to your email",
    });

  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ message }, { status: 500 });
  }
}
