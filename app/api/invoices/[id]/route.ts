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
    return NextResponse.json({ error: `Invoice #${params.id} not found` }, { status: 404 });
  }

  return NextResponse.json(selectedInvoice);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const filePath = path.join(process.cwd(), 'assets', 'invoices.json');

  try {
    const fileData = fs.readFileSync(filePath);
    const invoices = JSON.parse(fileData.toString());
    const { id } = params;
    const body = await req.json();

    const invoiceIndex = invoices.findIndex((invoice: FormType) => invoice.invoiceId === +id);

    if (invoiceIndex === -1) {
      return NextResponse.json({ error: `Invoice #${id} does not exist` }, { status: 404 });
    }

    // Update the invoice
    const updatedInvoice: IssuedInvoice = { ...invoices[invoiceIndex], ...body };
    invoices[invoiceIndex] = updatedInvoice;

    // Write the updated invoices back to the file
    fs.writeFileSync(filePath, JSON.stringify(invoices, null, 2));

    return NextResponse.json(updatedInvoice, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update invoice', details: error }, { status: 500 });
  }
}
