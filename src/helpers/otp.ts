import crypto from "crypto";
import bcrypt from "bcryptjs";

export function generate6DigitOtp() {
  return crypto.randomInt(100000, 1000000).toString(); // 6 digits
}

export const hashOtp = async(otp: string):Promise<string>=> {
  const hashotp =  await bcrypt.hash(otp , 10);
  return hashotp
}
