import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(req: NextRequest) {
  const filePath = path.join(process.cwd(), 'assets', 'clients.json');

  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    let parsedData;

    try {
      parsedData = JSON.parse(fileData);
    } catch (parseError) {
      return NextResponse.json({ error: 'Error parsing clients data' }, { status: 500 });
    }

    let data;
    try {
      data = await req.json();
    } catch (jsonError) {
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }

    parsedData.push(data);

    fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2));

    return NextResponse.json(parsedData, { status: 200 });
  } catch (error) {
    // Handle any other errors that may occur
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
