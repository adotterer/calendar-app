import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  // Check if the user is authenticated
  if (!session) {
    if (pathname.startsWith("/events")) {
      // Return JSON response for /events route if not authenticated
      return NextResponse.json(
        { error: "User is not authenticated" },
        { status: 401 }
      );
    }
    // Redirect to /login for /dashboard route if not authenticated
    return NextResponse.rewrite(new URL("/login", req.url));
  }

  // If authenticated, continue the request
  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard", "/events"],
};
