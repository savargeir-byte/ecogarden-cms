import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Admin route protection
  if (req.nextUrl.pathname.startsWith("/admin")) {
    // Get auth token from cookies
    const token = req.cookies.get('sb-access-token')?.value || 
                  req.cookies.get('supabase-auth-token')?.value;
    
    if (!token) {
      // No token - redirect to login
      const redirectUrl = new URL('/login', req.url);
      redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Create Supabase client with token
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      }
    );

    // Verify token and get user
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      // Invalid token - redirect to login
      const redirectUrl = new URL('/login', req.url);
      redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Check if user has admin or editor role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || (profile.role !== 'admin' && profile.role !== 'editor')) {
      // Not authorized - redirect to home
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
