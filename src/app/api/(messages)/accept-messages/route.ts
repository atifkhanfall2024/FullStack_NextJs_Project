import { AuthUser } from "@/helpers/authuser";
import { NextRequest, NextResponse } from "next/server";
import ConnectDb from "@/lib/db";
import UserModel from "@/models/user";

export async function POST(req:NextRequest) {
  
   try {
     const userData = await AuthUser(req)
    //console.log(user);
    if(!userData){
       return NextResponse.json({message:'Invalid Credantials, Please Login First'} , {status:401})
    }
      await ConnectDb()

      // now take user status from frontend
      const {Userstatus} = await req.json()
      const id = userData.id

      const AllowStatus = [true , false]
      if(!AllowStatus.includes(Userstatus))
      {
        return NextResponse.json({Message:"Not Allow ! , Only True or false Allowed"})
      }
     // console.log(Userstatus);
      if(Userstatus === undefined){
        return NextResponse.json({message:"User Status Required"} , {status:400})
      }
      // check in mongodb user by id then update his status
      

      const UpdateStatus = await UserModel.findByIdAndUpdate(
        id ,
        {AcceptMessages:Userstatus},
        {new:true}
      )
      if(!UpdateStatus){
        return NextResponse.json({message:"User Status Not update Success"} , {status:400})
      }

      

      return NextResponse.json({message:"Update User Status Into " + Userstatus}, { status: 200 });
   } catch (error) {
       const message =
    error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({message} , {status:500})
 }
   }


// now also need to take get api of accepting messages


export async function GET(req:NextRequest){

    try {
         const userData = await AuthUser(req)
    //console.log(user);
    if(!userData){
       return NextResponse.json({message:'Invalid Credantials, Please Login First'} , {status:401})
    }
      await ConnectDb()

    const id = userData.id
    const user  = await UserModel.findById(id)
    if(!user){
         return NextResponse.json({message:'User Not Found'} , {status:404})
    }

    return NextResponse.json({message:user.AcceptMessages},{status:200})

    } catch (error) {
        return NextResponse.json({messgae:"Something went Wrong"} , {status:400})
    }

}