import { AuthUser } from "@/src/helpers/authuser";
import ConnectDb from "@/src/lib/db";

import { NextRequest, NextResponse } from "next/server";

import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";



 export const runtime = 'nodejs'

export async function POST(req:NextRequest){

    const key = process.env.GEMINI
    //console.log(key);
    if(!key){
        return NextResponse.json({message:"Key is Required"})
    }
  const openai = createOpenAI({
    apiKey: key,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});
 


try {
      
    // connect db
        const userData = await AuthUser(req)
        //console.log(user);
        if(!userData){
           return NextResponse.json({message:'Invalid Credantials, Please Login First'} , {status:401})
        }
    await ConnectDb()

    const {message} = await req.json()
 if (!message || typeof message !== "string") {
      return NextResponse.json({ message: "message is required" }, { status: 400 });
    
    }
 const prompt = `
Generate three friendly, open-ended questions for an anonymous social app.
Return them as ONE string separated by '||'.
Avoid sensitive or personal topics. Keep the tone positive and engaging.
`;

const response = await streamText({
  model: openai.chat("gemini-2.5-flash-lite"),
    
    messages: [
         {role:"system" , content:prompt} ,
        { role: "user", content: message }],

})
//console.log(response.toTextStreamResponse());
// convert response into text stream
return response.toTextStreamResponse()
 //return NextResponse.json({message:response.toTextStreamResponse()})

} catch (error : any) {
     return NextResponse.json(
      { message: error?.message ?? "Server Error" },
      { status: 500 }
    );
}

}