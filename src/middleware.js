import { NextResponse } from "next/server";
/**
 * @param {import('next/server').NextRequest} request
 */

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublic = path === "/signin" || path === "/signup";
  const token = request.cookies.get("token")?.value || "";
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile","/signin", "/signup"],
};
