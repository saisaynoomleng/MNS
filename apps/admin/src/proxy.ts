import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';
import { env } from './lib/env/server';
import { BetterAuthSessionProps } from './lib/auth-client';

const publicRoutes = ['/sign-in', '/not-authorized'];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  const response = await fetch(`${env.API_URL}/api/auth/get-session`, {
    headers: {
      cookie: request.headers.get('cookie') ?? '',
    },
  });

  if (!response.ok) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  const session: BetterAuthSessionProps | null = await response.json();

  if (!session?.user) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  const roles = session.user.role?.split(',').map((role) => role.trim()) ?? [];

  if (!roles.includes('admin')) {
    return NextResponse.redirect(new URL('/not-authorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
