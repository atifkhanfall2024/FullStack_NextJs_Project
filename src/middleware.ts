import { NextRequest , NextResponse } from "next/server";


export function middleware(req:NextRequest){

    // here i took token
const token = req.cookies.get('token')?.value
const pathname = req.nextUrl.pathname

 if (token && (pathname.startsWith("/login") || pathname.startsWith("/signup") || pathname.startsWith('/verify')|| pathname.startsWith('/resend-otp')))  {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

if(!token){
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('from' , pathname)
    return NextResponse.redirect(url)
}


return NextResponse.next()

}

// configuration

export const config = {
  matcher: ["/dashboard/:path*", "/signout", "/login", "/signup"],
};