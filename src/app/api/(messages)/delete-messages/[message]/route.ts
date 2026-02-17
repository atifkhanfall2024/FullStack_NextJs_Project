import { AuthUser } from "@/src/helpers/authuser";
import ConnectDb from "@/src/lib/db";
import UserModel from "@/src/models/User";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function DELETE(req:NextRequest ,   { params }: { params: Promise<{ message: string }> }){
    try {
        
        const {message} = await params

       if (!mongoose.isValidObjectId(new mongoose.Types.ObjectId(message))) {
      return NextResponse.json({ message: "Invalid user id" }, { status: 400 });
    }

        // first we need to check that the user is authenticated or not
     const user = await AuthUser(req)
     const uid = (user as any ).id
      if (!mongoose.isValidObjectId(new mongoose.Types.ObjectId(uid))) {
      return NextResponse.json({ message: "Invalid user id" }, { status: 400 });
    }
     console.log(uid);
     console.log("messageid:", message);


      if(!user){
        return NextResponse.json({message:'Please Login into Your Account'} , {status:404})
      }

      await ConnectDb()

        const UpdateResult = await UserModel.updateOne({ _id:new mongoose.Types.ObjectId(uid)} , {$pull:{messages:{_id:new mongoose.Types.ObjectId(message)}}})

        
         if (UpdateResult.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Message not found or already deleted" },
        { status: 404 }
      );
    }
            
        return NextResponse.json({message:`delete user Message Success`} , {status:200})


    } catch (error) {

        let err = error instanceof Error ? error.message :"Something went wrong"

        return NextResponse.json({message:err} , {status:500})
    }


}