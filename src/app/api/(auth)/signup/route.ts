import { NextRequest, NextResponse } from "next/server";
import { SignupSchema } from "@/Schemas/SignupSchema";
import ConnectDb from "@/lib/db";
import { resend } from "@/lib/resend";
import UserModel from "@/models/user";
import { HashOtp } from "@/helpers/hashpass";
import { generate6DigitOtp, hashOtp } from "@/helpers/otp";
import {SendEmail} from '@/lib/nodemailder'


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
  //     await resend.emails.send({
  //   from: process.env.EMAIL_FROM!,
  //   to: email,
  //   subject: "Your verification code",
  //   html: `
  //     <h2>Verify your email</h2>
  //     <p>Your 6-digit code is:</p>
  //     <h1 style="letter-spacing: 6px;">${generate6Digit}</h1>
  //     <p>This code expires in 10 minutes.</p>
  //   `,
  // });
// save email into cookies
  
    await SendEmail(email , generate6Digit)

  let message: string = "OTP Send to your email plz verify it in 2 minutes";

  const response =   NextResponse.json({ok:true , message})
    response .cookies.set("signupEmail", email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 2 * 60, // 10 minutes
  });

  return response

  


 } catch (error:unknown) {
      const message =
    error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({error: { general: [message] }} , {status:500})
 }

}