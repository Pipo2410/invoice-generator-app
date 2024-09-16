import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

import { IssuedInvoice } from '@/utils/model';

export async function GET() {
  const filePath = path.join(process.cwd(), 'assets', 'invoices.json');
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData.toString());

  if (!data) {
    return NextResponse.error();
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const filePath = path.join(process.cwd(), 'assets', 'invoices.json');
  const fileData = fs.readFileSync(filePath);
  const parsedData = JSON.parse(fileData.toString());

  const data: IssuedInvoice = await req.json();
  const newInvoice = {
    ...data,
    status: 'issued',
  };

  parsedData.push(newInvoice);
  fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2));

  return Response.json(parsedData);
}
