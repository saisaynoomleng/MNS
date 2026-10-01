import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';
import { env } from '../lib/env/server';
import { BetterAuthSessionProps } from '../lib/auth-client';

const publicRoutes = ['/sign-in', '/not-authorized'];

export async function proxy(request: NextRequest) {
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  const response = await fetch(`${env.API_URL}/api/auth/get-session`, {
    headers: {
      cookie: request.headers.get('cookie') || '',
    },
  });

  if (!response.ok) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  const session: BetterAuthSessionProps = await response.json();

  const userRoles = session.user.role?.split(',') || [];

  if (!userRoles.includes('admin')) {
    return NextResponse.redirect(new URL('/not-authorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
