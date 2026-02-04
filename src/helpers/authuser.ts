import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./Signjwt_and_Verifytoken";

export async function AuthUser(req:NextRequest){

const token = await req.cookies.get('token')?.value
if(!token){
    return null
}
try {
  const userData = await verifyToken(token)
  return userData  
} catch (error) {
     return null
}

  

}