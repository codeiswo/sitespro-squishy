import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)',
  ],
};

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  let response;

  // Admin route checking
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Check for admin token
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      response = NextResponse.redirect(loginUrl);
    } else {
      // Basic token validation
      try {
        const parts = token.split('.');
        if (parts.length !== 3) {
          throw new Error('Invalid token format');
        }

        const payload = JSON.parse(atob(parts[1]));
        if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
          throw new Error('Token expired');
        }
        response = NextResponse.next();
      } catch {
        const loginUrl = new URL('/admin/login', request.url);
        response = NextResponse.redirect(loginUrl);
        response.cookies.set('admin_token', '', { maxAge: 0, path: '/' });
      }
    }
  } else {
    response = NextResponse.next();
  }

  // Set cache control headers to disable caching for dynamic routes
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  response.headers.set('CDN-Cache-Control', 'no-store, no-cache, must-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');

  return response;
}
