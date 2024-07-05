import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';


export async function GET(request, { params }) {
  const { id } = params;
  try {
    const withdrawals = await prisma.$queryRaw`SELECT * FROM Withdrawal WHERE id = ${id}`;
    return NextResponse.json(withdrawals);
  } catch (error) {
    console.log("Error fetching Withdrawal:", error);
    return NextResponse.json(
      { message: 'Failed to fetch Withdrawal', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { userId, amount, prev_balance, post_balance, trxId, status } = data;
    const id = parseInt(params.id);

    const updatedWithdrawal = await prisma.withdrawal.update({
      where: {
        id: id,
      },
      data: {
        userId: parseInt(userId),
        amount: parseFloat(amount),
        prev_balance: parseFloat(prev_balance),
        post_balance: parseFloat(post_balance),
        trxId: trxId,
        status: status,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(updatedWithdrawal);
  } catch (error) {
    console.log("Error updating Withdrawal:", error);
    return NextResponse.json(
      { message: 'Failed to update Withdrawal', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    const deletedWithdrawal = await prisma.withdrawal.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deletedWithdrawal);
  } catch (error) {
    console.log("Error deleting Withdrawal:", error);
    return NextResponse.json(
      { message: 'Failed to delete Withdrawal', error: error.message },
      { status: 500 }
    );
  }
}