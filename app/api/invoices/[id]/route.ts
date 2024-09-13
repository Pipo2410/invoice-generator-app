import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

import { FormType, IssuedInvoice } from '@/context/model';

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
  const filePath = path.join(process.cwd(), 'assets', 'invoices.json');
  const fileData = fs.readFileSync(filePath);
  const parsedData = JSON.parse(fileData.toString());

  const selectedInvoice = parsedData.find((invoice: FormType) => invoice.invoiceId === +params.id);

  if (!selectedInvoice) {
    return NextResponse.json({ reason: `Invoice with the id: ${params.id} not found`, ok: false });
  }

  return NextResponse.json({ invoice: selectedInvoice, ok: true });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const filePath = path.join(process.cwd(), 'assets', 'invoices.json');

  try {
    const fileData = fs.readFileSync(filePath);
    const invoices = JSON.parse(fileData.toString());
    const { id } = params; // Get the invoice ID from the URL
    const body = await req.json(); // Parse the request body

    const invoiceIndex = invoices.findIndex((invoice: FormType) => invoice.invoiceId === +id);

    if (invoiceIndex === -1) {
      return NextResponse.json({ error: `Invoice #${id} does not exist` }, { status: 404 });
    }

    // Update the invoice
    const updatedInvoice: IssuedInvoice = { ...invoices[invoiceIndex], ...body };
    invoices[invoiceIndex] = updatedInvoice;

    // Validate the incoming data using Zod schema
    // const validatedData = IssuedInvoiceSchema.safeParse(updatedInvoice);

    // if (!validatedData.success) {
    //   // return NextResponse.error();
    //   return NextResponse.json({ error: 'Invalid data', issues: validatedData.error.issues }, { status: 400 });
    // }

    // Write the updated invoices back to the file
    fs.writeFileSync(filePath, JSON.stringify(invoices, null, 2));

    return NextResponse.json(updatedInvoice, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during processing
    return NextResponse.json({ error: 'Failed to update invoice', details: error }, { status: 500 });
  }
}

// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   const filePath = path.join(process.cwd(), 'assets', 'invoices.json');
//   const fileData = fs.readFileSync(filePath);
//   const parsedData = JSON.parse(fileData.toString());
//   const { id } = params; // Get the client ID from the URL

//   try {
//     const body = await req.json(); // Parse the request body

//     const selectedInvoiceIndex = parsedData.findIndex((invoice: FormType) => invoice.invoiceId === +id);

//     if (selectedInvoiceIndex === -1) {
//       return NextResponse.json({ error: 'Invoice does not exist' }, { status: 500 });
//     }

//     const selectedInvoice = parsedData.find((invoice: FormType) => invoice.invoiceId === +id);

//     const updatedInvoice = {
//       ...selectedInvoice,
//       ...body,
//     };
//     parsedData[selectedInvoiceIndex] = updatedInvoice;
//     fs.writeFileSync(filePath, JSON.stringify(parsedData));

//     // Return a success response
//     return NextResponse.json(updatedInvoice, { status: 200 });
//   } catch (error) {
//     // Handle any errors that occur during processing
//     return NextResponse.json({ error: 'Failed to update client' }, { status: 500 });
//   }
// }
