import { jwtVerify } from "jose";
import { Yuji_Hentaigana_Akari } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";

// const SECRET_KEY = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);

const secret = process.env.REFRESH_TOKEN_SECRET
if(!secret) throw new Error("REFRESH_TOKEN_SECRET is not defined")
const SECRET_KEY = new TextEncoder().encode(secret)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("refresh_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // ตรวจสอบ JWT
    const { payload } = await jwtVerify(token, SECRET_KEY);

    //ไม่มี role ที่ที่รู้จัก
    if(payload.role !== "admin" && payload.role !== "user"){
      return NextResponse.redirect(new URL("/", request.url));
    }

    // ป้องกัน user เข้า route ของ admin
    if (pathname.startsWith("/dashboard/admin") && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname.startsWith("/dashboard/user") && payload.role !== "user") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname === "/dashboard") {
      if (payload.role === "admin") {
        return NextResponse.redirect(
          new URL("/dashboard/admin/main", request.url),
        );
      }
      if (payload.role === "user") {
        return NextResponse.redirect(
          new URL("/dashboard/user/main", request.url),
        );
      }
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
