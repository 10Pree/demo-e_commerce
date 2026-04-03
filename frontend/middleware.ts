import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET)

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const token = request.cookies.get('refresh_token')?.value

    if(!token){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    try{
        // ตรวจสอบ JWT
        const { payload } = await jwtVerify(token, SECRET_KEY)

        if(pathname.startsWith('/dashboard') && payload.role !== "admin" ){
            return NextResponse.redirect(new URL('/', request.url))
        }

        return NextResponse.next()

    }catch(err){
        return NextResponse.redirect(new URL('/login', request.url))
    }
}


export const config = {
    matcher: [
        '/dashboard/:path*',
    ]
}

