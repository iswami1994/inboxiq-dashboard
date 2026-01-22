import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const protectedRoutes = [
  "/",
  "/conversations",
  "/analytics",
  "/settings",
  "/calendar",
  "/profile",
];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ["/signin", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("inboxiq_access_token")?.value;

  // Check if the path is a protected route (including sub-paths)
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Check if the path is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname === route);

  // If trying to access protected route without auth, redirect to signin
  if (isProtectedRoute && !token) {
    const signinUrl = new URL("/signin", request.url);
    signinUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(signinUrl);
  }

  // If already authenticated and trying to access auth routes, redirect to dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     * - reset-password (password reset flow - needs to work without auth)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|reset-password).*)",
  ],
};
