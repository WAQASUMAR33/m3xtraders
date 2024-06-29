import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    const { title, amount } = data;

    const newPackage = await prisma.package.create({
      data: {
        title: title,
        amount: parseFloat(amount),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(newPackage);
  } catch (error) {
    console.error('Error creating Package:', error);
    return NextResponse.json(
      {
        message: 'Failed to create Package',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const packages = await prisma.package.findMany();
    return NextResponse.json(packages);
  } catch (error) {
    console.log("Error fetching Packages:", error);
    return NextResponse.json(
      { message: 'Failed to fetch Packages', error: error.message },
      { status: 500 }
    );
  }
}