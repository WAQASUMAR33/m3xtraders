import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const rewards = await prisma.$queryRaw`SELECT * FROM Rewards WHERE userId = ${parseInt(id)}`;

    return NextResponse.json(rewards);
  } catch (error) {
    console.log("Error fetching Rewards:", error);
    return NextResponse.json(
      { message: 'Failed to fetch Rewards', error: error.message },
      { status: 500 }
    );
  }
}



export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    const deletedPackage = await prisma.Rewards.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deletedPackage);
  } catch (error) {
    console.log("Error deleting Rewards:", error);
    return NextResponse.json(
      { message: 'Failed to delete Rewards', error: error.message },
      { status: 500 }
    );
  }
}