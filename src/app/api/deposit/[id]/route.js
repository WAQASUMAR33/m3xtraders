import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';


export async function GET(request, { params }) {
  const { id } = params;
  try {
    const deposits = await prisma.$queryRaw`SELECT * FROM Deposit WHERE userId = ${id}`;
    return NextResponse.json(deposits);
  } catch (error) {
    console.log("Error fetching Deposit:", error);
    return NextResponse.json(
      { message: 'Failed to fetch Deposit', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { userId, packageId, amount, trxId, status } = data;
    const id = parseInt(params.id);

    const updatedDeposit = await prisma.deposit.update({
      where: {
        id: id,
      },
      data: { 
        userId: parseInt(userId),
        packageId: parseInt(packageId),
        amount: parseFloat(amount),
        trxId: trxId,
        status: status,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(updatedDeposit);
  } catch (error) {
    console.log("Error updating Deposit:", error);
    return NextResponse.json(
      { message: 'Failed to update Deposit', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    const deletedDeposit = await prisma.deposit.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deletedDeposit);
  } catch (error) {
    console.log("Error deleting Deposit:", error);
    return NextResponse.json(
      { message: 'Failed to delete Deposit', error: error.message },
      { status: 500 }
    );
  }
}