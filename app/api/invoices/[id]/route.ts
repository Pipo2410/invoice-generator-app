import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

import { FormType } from '@/context/model';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const filePath = path.join(process.cwd(), 'assets', 'invoices.json');
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData.toString());

  const selectedInvoice = data.find(({ invoice }: FormType) => invoice.id === params.id);

  if (!selectedInvoice) {
    return NextResponse.json({ status: 'error', reason: `Invoice with the id: ${params.id} not found`, ok: false });
  }

  return NextResponse.json({ ...selectedInvoice, ok: true });
}
