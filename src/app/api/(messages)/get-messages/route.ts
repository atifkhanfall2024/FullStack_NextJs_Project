import UserModel from "../../../../models/User";
import { AuthUser } from "../../../../helpers/authuser";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import ConnectDb from "../../../../lib/db";
export async function GET(req:NextRequest){

    try {
        
        // here first we check db connection as well as token
    const UserData = await AuthUser(req)

    if(!UserData){
           return NextResponse.json({message:'Invalid Credantials, Please Login First'} , {status:401})
    }

    await ConnectDb()

    const uid = UserData?.id
   
    //console.log(uid);

    // now using agreegation to take messages from user document

    const getMessages = await UserModel.aggregate([
        // this match will give me the loggedin user id pick that user for me 
        {$match:{_id: new mongoose.Types.ObjectId (uid as string)}},

        // this field will convert the arrays docx into single docxs

        {$unwind:'$messages'},

        // now to show the latest messages
        {$sort : {'messages.CreatedAt':-1}},

        // this will give me top 10 latest messages

        {$limit:10} ,

        // now group these all into single array so latest show first and old last

        {$group : {_id:'$_id' , messages:{$push:'$messages'} } }

    ])

    if(!getMessages || getMessages.length===0){
        return NextResponse.json({message:"User Not Found"} , {status:404})
    }

    return NextResponse.json({message:getMessages[0].messages} , {status:200})

    } catch (error) {
        return NextResponse.json({message:error})
    }

}