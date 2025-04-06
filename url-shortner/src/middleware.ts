// middleware.ts
import { NextRequest, NextResponse } from "next/server";

// Define paths that don’t require authentication
const publicPaths = ["/login", "/signup", "/"]; // Add any public routes here

export function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get("token")?.value; // Adjust 'token' to match your cookie name

  // Get the requested pathname
  const { pathname } = request.nextUrl;

  // Allow access to public paths without a token
  if (publicPaths.includes(pathname)) {
    return NextResponse.next(); // Proceed to the requested page
  }

  // If no token is found, redirect to login
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If token exists, proceed to the requested page
  return NextResponse.next();
}

// Define which paths this middleware applies to
export const config = {
  matcher: ["/analytics", "/dashboard", "/((?!_next|api|favicon.ico).*)"], // Apply to specific routes or all except certain ones
};
