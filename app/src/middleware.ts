import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkIsLogin } from "./utils/server-auth";

export async function middleware(request: NextRequest) {
	const isLogin = await checkIsLogin();

	const { pathname } = request.nextUrl;

	if (isLogin && (pathname === "/masuk" || pathname === "/daftar"))
		return NextResponse.redirect(new URL("/anggota/dashboard", request.url));

	if (isLogin && pathname === "/anggota")
		return NextResponse.redirect(new URL("/anggota/dashboard", request.url));

	if (!isLogin && pathname === "/anggota")
		return NextResponse.redirect(new URL("/masuk", request.url));

	if (!isLogin && pathname.startsWith("/anggota"))
		return NextResponse.redirect(new URL("/masuk", request.url));
}

export const config = {
	matcher: ["/masuk", "/daftar", "/anggota/:path*", "/anggota"],
};
