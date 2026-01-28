import UserModel from '@/src/models/User'
import { SigninSchema } from '@/src/Schemas/SigninSchema'
import {NextRequest, NextResponse} from 'next/server'
import { Compare } from '@/src/helpers/hashpass'
import ConnectDb from '@/src/lib/db'

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
 return NextResponse.json({message:'please verify email First'} , {status:200})
}

// now also comparing passward for login

const checkPass = await Compare(password , user.password)
if(!checkPass){
    return NextResponse.json({ message: "Invalid Credantials" } , {status:401});
}

return NextResponse.json({message:"User Login Success" , user} , {status:200})

    
} catch (error) {
    let message  = 'Something went Wrong'
    error instanceof Error ? error.message : message
       return NextResponse.json({message} , {status:500})
}



}