import { NextRequest, NextResponse } from 'next/server';

const AUTH_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function GET(request: NextRequest) {
  return proxyToAuthAPI(request);
}

export async function POST(request: NextRequest) {
  return proxyToAuthAPI(request);
}

async function proxyToAuthAPI(request: NextRequest) {
  const url = new URL(request.url);
  const targetUrl = `${AUTH_API_URL}${url.pathname}${url.search}`;

  const response = await fetch(targetUrl, {
    method: request.method,
    headers: {
      ...Object.fromEntries(request.headers),
      host: new URL(AUTH_API_URL).host,
    },
    body: request.body ? await request.text() : undefined,
  });

  // Forward cookies from auth API
  const setCookie = response.headers.getSetCookie();

  const nextResponse = new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });

  // Manually set cookies
  setCookie.forEach((cookie) => {
    nextResponse.headers.append('Set-Cookie', cookie);
  });

  return nextResponse;
}
