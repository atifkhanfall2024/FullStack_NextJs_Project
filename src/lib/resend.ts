import { Resend } from "resend";

let key = process.env.RESEND
if(!key){
    throw new Error("Key not present")
}

export const resend = new Resend(key);
