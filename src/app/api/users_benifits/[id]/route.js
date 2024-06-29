import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const userBenefit = await prisma.userBenefit.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(userBenefit);
  } catch (error) {
    console.log("Error fetching UserBenefit:", error);
    return NextResponse.json(
      { message: 'Failed to fetch UserBenefit', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { userId, amount, level } = data;
    const id = parseInt(params.id);

    const updatedUserBenefit = await prisma.userBenefit.update({
      where: {
        id: id,
      },
      data: {
        userId: parseInt(userId),
        amount: parseFloat(amount),
        level: parseInt(level),
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(updatedUserBenefit);
  } catch (error) {
    console.log("Error updating UserBenefit:", error);
    return NextResponse.json(
      { message: 'Failed to update UserBenefit', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    const deletedUserBenefit = await prisma.userBenefit.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deletedUserBenefit);
  } catch (error) {
    console.log("Error deleting UserBenefit:", error);
    return NextResponse.json(
      { message: 'Failed to delete UserBenefit', error: error.message },
      { status: 500 }
    );
  }
}