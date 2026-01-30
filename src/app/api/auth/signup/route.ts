import { NextRequest, NextResponse } from "next/server";
import { SignupSchema } from "@/src/Schemas/SignupSchema";
import ConnectDb from "@/src/lib/db";
import { resend } from "@/src/lib/resend";
import UserModel from "@/src/models/User";
import { HashOtp } from "@/src/helpers/hashpass";
import { cookies } from "next/headers";

import { generate6DigitOtp, hashOtp } from "@/src/helpers/otp";


export async function POST(req:NextRequest){

 try {
       const body = await req.json()
    const parse = SignupSchema.safeParse(body)
    if(!parse.success){
        return NextResponse.json(
            {error:parse.error.flatten().fieldErrors},{status:400}
        )
    }

    await ConnectDb()

   

    const {UserName , email , password } = parse.data
  const Hashh = await HashOtp(password)
 const generate6Digit =  generate6DigitOtp()
 const hashotp = await hashOtp(generate6Digit)

     await UserModel.create(
        {
            email , password:Hashh , UserName , Otp:hashotp , otpExpiry: new Date(Date.now() + 2 * 60 * 1000) , messages:[],
        }
    )
      await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: "Your verification code",
    html: `
      <h2>Verify your email</h2>
      <p>Your 6-digit code is:</p>
      <h1 style="letter-spacing: 6px;">${generate6Digit}</h1>
      <p>This code expires in 10 minutes.</p>
    `,
  });
// save email into cookies
  
  let message: string = "OTP Send to your email plz verify it in 2 minutes";

  return  NextResponse.json({ok:true , message})
  //   response .cookies.set("signupEmail", email, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "lax",
  //   maxAge: 5 * 60, // 5 minutes
  // });

  


 } catch (error:unknown) {
      const message =
    error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({message} , {status:500})
 }

}