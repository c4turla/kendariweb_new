import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboardRoute) {
    // Check if the user has an active better-auth session cookie
    const authCookie = request.cookies.get('better-auth.session_token') || request.cookies.get('__Secure-better-auth.session_token');
    
    if (!authCookie) {
      // Redirect to custom login page if trying to access dashboard without session
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
