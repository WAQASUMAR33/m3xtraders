import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    const { userId, packageId, amount, trxId, status } = data;

    const newDeposit = await prisma.deposit.create({
      data: {
        userId: parseInt(userId),
        packageId: parseInt(packageId),
        amount: parseFloat(amount),
        trxId: trxId,
        status: status,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(newDeposit);
  } catch (error) {
    console.error('Error creating Deposit:', error);
    return NextResponse.json(
      {
        message: 'Failed to create Deposit',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const deposits = await prisma.deposit.findMany();
    return NextResponse.json(deposits);
  } catch (error) {
    console.log("Error fetching deposits:", error);
    return NextResponse.json(
      { message: 'Failed to fetch deposits', error: error.message },
      { status: 500 }
    );
  }
}