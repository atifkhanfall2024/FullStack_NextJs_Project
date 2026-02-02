import { SignJWT , jwtVerify } from "jose";

const secret = new TextEncoder().encode( process.env.JWT)
export async function SignIntoken(payload :Record<string , any>){

      return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}

