import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    const { per_Level1, per_Level2, per_Level3, per_Profit, others } = data;

    const newSetting = await prisma.setting.create({
      data: {
        per_Level1: parseFloat(per_Level1),
        per_Level2: parseFloat(per_Level2),
        per_Level3: parseFloat(per_Level3),
        per_Profit: parseFloat(per_Profit),
        others,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(newSetting);
  } catch (error) {
    console.error('Error creating Setting:', error);
    return NextResponse.json(
      {
        message: 'Failed to create Setting',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const settings = await prisma.setting.findMany();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching Settings:', error);
    return NextResponse.json(
      { message: 'Failed to fetch Settings', error: error.message },
      { status: 500 }
    );
  }
}
