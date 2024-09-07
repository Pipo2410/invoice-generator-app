import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

import { Item } from '@/context/model';

export type ItemsApiResponse = {
  items: Item[];
};

export async function GET() {
  const filePath = path.join(process.cwd(), 'assets', 'items.json');
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData.toString());

  return NextResponse.json(data);
}
