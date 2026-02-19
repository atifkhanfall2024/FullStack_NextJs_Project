import UserModel from '@/models/user'
import { SigninSchema } from '@/Schemas/SigninSchema'
import {NextRequest, NextResponse} from 'next/server'
import { Compare } from '@/helpers/hashpass'
import ConnectDb from '@/lib/db'
import { SignIntoken } from '@/helpers/Signjwt_and_Verifytoken'

export async function POST(req:NextRequest){

// this is login api 

try {
const {email , password} = await req.json()
// const parse = SigninSchema.safeParse(body)

// if(!parse.success){
//     return NextResponse.json({error:parse.error.flatten().fieldErrors},{status:400})
// }

 await ConnectDb()

const user = await UserModel.findOne({email});
if (!user ) {
  return NextResponse.json({ message: "User not found" } , {status:404});
}

//console.log(user);


if (user.isVerified === false) { 
 return NextResponse.json({message:'please verify email First'} , {status:401})
}

// now also comparing passward for login

const checkPass = await Compare(password , user.password)
if(!checkPass){
    return NextResponse.json({ message: "Invalid Credantials" } , {status:401});
}

// setup of cookies

const token = await SignIntoken({id:user._id.toString() , UserName:user.UserName , isVerfied:user.isVerified , AcceptMessages:user.AcceptMessages})

const res =  NextResponse.json({message:"User Login Success" , user} , {status:200})
res.cookies.set('token' , token , {
    httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
})

return res

    
} catch (error) {
    let message  = 'Something went Wrong'
     console.error("LOGIN ERROR:", error); 
    error instanceof Error ? error.message : message
       return NextResponse.json({message} , {status:500})
}



}