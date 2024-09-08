import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(req: NextRequest) {
  const filePath = path.join(process.cwd(), 'assets', 'invoices.json');
  const fileData = fs.readFileSync(filePath);
  const parsedData = JSON.parse(fileData.toString());

  const data = await req.json();

  parsedData.invoices.push(data);
  fs.writeFileSync(filePath, JSON.stringify(parsedData));

  console.log('POST: /api/invoices => New invoice created', data);

  return NextResponse.json(parsedData);
}
