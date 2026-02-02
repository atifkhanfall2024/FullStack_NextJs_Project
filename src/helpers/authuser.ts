import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./Signjwt_and_Verifytoken";

export async function AuthUser(req:NextRequest){

const token = await req.cookies.get('token')?.value
if(!token){
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}
try {
  const userData = await verifyToken(token)
  return NextResponse.json({userData})  
} catch (error) {
     return NextResponse.json({ message: error }, { status: 401 });
}

  

}