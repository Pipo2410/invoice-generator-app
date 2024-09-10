import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'assets', 'clients.json');
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData.toString());

  return NextResponse.json(data);
}
