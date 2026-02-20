import { AuthUser } from "@/helpers/authuser";
import ConnectDb from "@/lib/db";
import UserModel, { Messages } from "@/models/user";

import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){

    try {

        // check for token
//     const userToken = await AuthUser(req)
//   if(!userToken){
    
//            return NextResponse.json({message:'Invalid Credantials, Please Login First'} , {status:401})
    
//   }
        await ConnectDb()

    // take userName and content from body
    const {UserName , Context} = await req.json()

    if(Context === "" || !Context){
          return NextResponse.json({message:'Content is required'} , {status:401})
    }
    // first check if user exist or not

    const user = await UserModel.findOne({UserName})
    if(!user){
        return NextResponse.json({message:'User Not Found'} , {status:404})
    }

    if(!user.AcceptMessages){
           return NextResponse.json({message:'User Cannot Accept Status'} , {status:403})
    }

    const SendMessage = {Context , CreatedAt:new Date()}
    user.messages.push(SendMessage as Messages)
    await user.save()
    return NextResponse.json({message:"Message Send To "+ UserName + " SuccessFully"} , {status:200})
        
    } catch (error) {
        

       const message =  error instanceof Error ? error.message : 'Something went wrong'

       return NextResponse.json({message:message} , {status:403})
    }

}