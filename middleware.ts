import { NextRequest, NextResponse } from 'next/server';

import { IssuedInvoiceSchema } from './context/model';

export async function middleware(request: NextRequest) {
  const {
    method,
    nextUrl: { pathname },
  } = request;

  if (pathname.includes('/api/invoices') && method === 'PUT') {
    const requestBody = await request.json();
    const schemaShape = IssuedInvoiceSchema.shape;
    const errors = [];

    for (const prop of Object.keys(requestBody)) {
      if (prop in schemaShape) {
        const schemaField = schemaShape[prop as keyof typeof schemaShape];

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

export const config = {
  matcher: '/api/invoices/:id*',
};
