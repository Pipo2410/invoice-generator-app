import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(req: NextRequest) {
  const filePath = path.join(process.cwd(), 'assets', 'clients.json');
  const fileData = fs.readFileSync(filePath);
  const parsedData = JSON.parse(fileData.toString());

  const data = await req.json();

  parsedData.push(data);
  fs.writeFileSync(filePath, JSON.stringify(parsedData));

  console.log('POST: /api/clients/create => New user created', data);

  return NextResponse.json(parsedData);
}
