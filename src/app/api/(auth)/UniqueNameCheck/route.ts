import { NextRequest, NextResponse } from "next/server";
import { UserNames } from "@/Schemas/SignupSchema";
import UserModel from "@/models/User";
import ConnectDb from "@/lib/db";
export async function GET(req:NextRequest){

    try{

       await ConnectDb()
        // here i take name from user but name should be greater than 3 character and also check that only unique name will store in db
      const {searchParams} = new URL(req.url)
      //console.log(searchParams); 

       const UserName = searchParams.get('UserName')
      //  UserName?.toLowerCase()
       if(!UserName){
           return NextResponse.json(
        { message: "UserName query param is required" },
        { status: 400 }
      );
       }

      // console.log(UserName);
    const parse = UserNames.safeParse(UserName)

    if(!parse.success){
        return NextResponse.json({message:parse.error.format()} , {status:400})
    }

    const name = parse.data
   
    const user = await UserModel.findOne({UserName:name , isVerified:true})

    if(user){
        return NextResponse.json({message:"User Name Already Exist"} , {status:400})
    }


    return NextResponse.json({message:"User Name is Unique"} , {status:201})

    }catch(err:any){
        return NextResponse.json({error:err.message , success:200} , {status:400})
    }

}