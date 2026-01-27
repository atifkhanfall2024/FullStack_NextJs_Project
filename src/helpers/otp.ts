import crypto from "crypto";

export function generate6DigitOtp() {
  return crypto.randomInt(100000, 1000000).toString(); // 6 digits
}

export function hashOtp(otp: string) {
  return crypto.createHash("sha256").update(otp).digest("hex");
}
