// import { NextRequest , NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(req:NextRequest){

//     // here i took token
// const token = await getToken({req:req})
// const pathname = req.nextUrl.pathname

//  if (token && (pathname.startsWith("/login") || pathname.startsWith("/signup") || pathname.startsWith('/verify')|| pathname.startsWith('/resend-otp')))  {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }

// if(!token){
//     const url = req.nextUrl.clone()
//     url.pathname = '/login'
//     url.searchParams.set('from' , pathname)
//     return NextResponse.redirect(url)
// }


// return NextResponse.next()

// }

// // configuration

// export const config = {
//   matcher: ["/dashboard/:path*", "/signout", "/login", "/signup"],
// };


import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./helpers/Signjwt_and_Verifytoken";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // read your cookie
  const token = req.cookies.get("token")?.value;

  // If token exists, verify it
  let isLoggedIn = false;
  if (token) {
    try {
      await verifyToken(token);
      isLoggedIn = true;
    } catch {
      isLoggedIn = false;
    }
  }

  if (
    isLoggedIn &&
    (pathname.startsWith("/login") ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/VerifyOtp") ||
      pathname.startsWith("/resend"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ✅ If not logged in, block protected pages
  if (!isLoggedIn && pathname.startsWith("/dashboard")) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}