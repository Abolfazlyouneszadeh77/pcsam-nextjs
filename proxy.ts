import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const authToken = request.cookies.get("authToken");

  const isLoginPage = request.nextUrl.pathname === "/login";

  // اگر لاگین نیست و صفحه لاگین هم نیست → redirect
  // if (!authToken && !isLoginPage) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // اگر لاگین هست و میره صفحه لاگین → redirect به home
  // if (authToken && isLoginPage) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/products", "/profile"],
};
