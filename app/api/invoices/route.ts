import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'assets', 'invoices.json');
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData.toString());

  if (!data) {
    return NextResponse.error();
  }

  return NextResponse.json({ invoices: data, length: data.length });
}

export async function POST(req: NextRequest) {
  const filePath = path.join(process.cwd(), 'assets', 'invoices.json');
  const fileData = fs.readFileSync(filePath);
  const parsedData = JSON.parse(fileData.toString());

  const data = await req.json();

  parsedData.push(data);
  fs.writeFileSync(filePath, JSON.stringify(parsedData));

  console.log('POST: /api/invoices => New invoice created', data);

  return Response.json(parsedData);
}
