import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    const { userId, amount, prev_balance, post_balance, trxId, status } = data;

    const newWithdrawal = await prisma.withdrawal.create({
      data: {
        userId: parseInt(userId),
        amount: parseFloat(amount),
        prev_balance: parseFloat(prev_balance),
        post_balance: parseFloat(post_balance),
        trxId: trxId,
        status: status,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(newWithdrawal);
  } catch (error) {
    console.error('Error creating Withdrawal:', error);
    return NextResponse.json(
      {
        message: 'Failed to create Withdrawal',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const withdrawals = await prisma.withdrawal.findMany();
    return NextResponse.json(withdrawals);
  } catch (error) {
    console.log("Error fetching Withdrawals:", error);
    return NextResponse.json(
      { message: 'Failed to fetch Withdrawals', error: error.message },
      { status: 500 }
    );
  }
}