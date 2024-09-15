import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

import { Client } from '@/context/model';

export async function GET() {
  const filePath = path.join(process.cwd(), 'assets', 'clients.json');
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData.toString());

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const filePath = path.join(process.cwd(), 'assets', 'clients.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const parsedData = JSON.parse(fileData);

  const data = await req.json();

  parsedData.push(data);
  fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2));

  console.log('POST: /api/clients/create => New user created', data);

  return NextResponse.json(parsedData);
}

export async function PUT(req: NextRequest) {
  const filePath = path.join(process.cwd(), 'assets', 'clients.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const parsedData: Client[] = JSON.parse(fileData);

  const data: Client = await req.json();

  const index = parsedData.findIndex((client) => client.id === data.id);

  if (index === -1) {
    return NextResponse.json({ message: 'Client not found' }, { status: 404 });
  }

  parsedData[index] = { ...parsedData[index], ...data };
  fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2));

  return NextResponse.json(parsedData);
}
