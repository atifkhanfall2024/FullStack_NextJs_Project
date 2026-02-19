import { Compare } from "../../../../helpers/hashpass";
import UserModel from "../../../../models/User";
import { VerifySchema } from "../../../../Schemas/VerifySchema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import ConnectDb from "../../../../lib/db";
export async function POST(req:NextRequest){

try {
    
    const body = await req.json()
    const parse = VerifySchema.safeParse(body)
    if(!parse.success){
          return NextResponse.json({error:parse.error.flatten().fieldErrors} , {status:400})
    }
 
     await ConnectDb()

    const {Otp} = parse.data
 const cookie = await cookies()
const email = cookie.get("signupEmail")?.value
console.log("all cookies:", cookie.getAll());

    console.log(email);

    // now first this email into database
    const user = await UserModel.findOne({email})
    if(!user || !user.Otp){
        return NextResponse.json({message:"User Not Found"} , { status: 404 })
    }

    if(user.otpExpiry && user.otpExpiry < new Date()){
    return NextResponse.json({ message: "Otp Expired" }, { status: 400 });
}

    // if have user then verify his otp 
    const verifyOtp = await Compare(Otp , user.Otp)

    if(!verifyOtp){
          return NextResponse.json({message:"Otp Not Match"} , { status: 404 })
    }

    user.Otp =undefined
    //user.otpExpiry=undefined
    user.isVerified=true
    await user.save()

    return NextResponse.json({message:"Otp Verify Success"} , {status:200})


} catch (error:unknown) {
      const message =
    error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({message} , {status:500})
 }

}
