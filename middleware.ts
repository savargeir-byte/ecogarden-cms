import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Admin route protection
  if (req.nextUrl.pathname.startsWith("/admin")) {
    // Simple auth check - can be enhanced later
    // For now, just allow access
    // TODO: Implement proper Supabase auth check in production
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
