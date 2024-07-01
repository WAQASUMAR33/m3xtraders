import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    const { id, title, amount } = data;

    let newPackage;
    if (id) {
      // Update existing package
      newPackage = await prisma.package.update({
        where: { id },
        data: {
          title,
          amount: parseFloat(amount),
          updatedAt: new Date(),
        },
      });
    } else {
      // Create new package
      newPackage = await prisma.package.create({
        data: {
          title,
          amount: parseFloat(amount),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }

    return NextResponse.json(newPackage);
  } catch (error) {
    console.error('Error creating or updating Package:', error);
    return NextResponse.json(
      {
        message: 'Failed to create or update Package',
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
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await prisma.package.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Error deleting Package:', error);
    return NextResponse.json(
      {
        message: 'Failed to delete Package',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
