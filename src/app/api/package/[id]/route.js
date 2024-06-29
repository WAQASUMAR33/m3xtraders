import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const packages = await prisma.package.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(packages);
  } catch (error) {
    console.log("Error fetching Package:", error);
    return NextResponse.json(
      { message: 'Failed to fetch Package', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { title, amount } = data;
    const id = parseInt(params.id);

    const updatedPackage = await prisma.package.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        amount: parseFloat(amount),
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(updatedPackage);
  } catch (error) {
    console.log("Error updating Package:", error);
    return NextResponse.json(
      { message: 'Failed to update Package', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    const deletedPackage = await prisma.package.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deletedPackage);
  } catch (error) {
    console.log("Error deleting Package:", error);
    return NextResponse.json(
      { message: 'Failed to delete Package', error: error.message },
      { status: 500 }
    );
  }
}