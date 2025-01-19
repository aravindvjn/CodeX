import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const unprotectedPaths = ['/auth'];

  const pathname = req.nextUrl.pathname;

  if (unprotectedPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {

    return NextResponse.redirect(new URL('/auth', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|auth).*)',
  ],
};
