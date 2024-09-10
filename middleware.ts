// import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

// import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware() {
  // const pathname = request.nextUrl.pathname;
  // const invoicePathRegex = /^\/api\/invoices\/(\d+)$/;

  // if (!invoicePathRegex.test(pathname)) {
  //   return NextResponse.error();
  // }

  // TODO: figure out how to make this work only for /api/invoices/:ID

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/invoices/:id*',
};
