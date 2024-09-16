import { NextRequest, NextResponse } from 'next/server';

import { ClientSchema } from './context/model';

export async function middleware(request: NextRequest) {
  const {
    method,
    nextUrl: { pathname },
  } = request;

  console.log(`[LOG] ${method} request to ${pathname} at ${new Date().toISOString()}`);

  if (pathname.includes('/api/clients') && method === 'POST') {
    try {
      const body = await request.json();
      ClientSchema.parse(body);
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ error: 'Invalid client data', details: error.message }, { status: 400 });
      } else {
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
      }
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: '/api/clients/create',
};
