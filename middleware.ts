// import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { IssuedInvoiceSchema } from './context/model';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const {
    method,
    nextUrl: { pathname },
  } = request;

  if (pathname.includes('/api/invoices') && method === 'PUT') {
    const requestBody = await request.json();
    const schemaShape = IssuedInvoiceSchema.shape;
    const errors = [];

    // Loop through each property in the request body
    for (const prop of Object.keys(requestBody)) {
      // Use narrowing to ensure prop is one of the keys of schemaShape
      if (prop in schemaShape) {
        const schemaField = schemaShape[prop as keyof typeof schemaShape];

        // Validate each field individually using safeParse
        const validationResult = schemaField.safeParse(requestBody[prop]);

        if (!validationResult.success) {
          errors.push({
            field: prop,
            message: JSON.parse(validationResult.error.message),
          });
        }
      } else {
        errors.push({
          field: prop,
          message: `Field ${prop} is not valid property of Invoice`,
        });
      }
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: errors }, { status: 500 });
    }
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/invoices/:id*',
};

// const invoicePathRegex = /^\/api\/invoices\/(\d+)$/;
