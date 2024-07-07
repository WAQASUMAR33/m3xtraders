import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    const { userId, amount, prev_balance, post_balance, trxId, status } = data;


    const result3 = await prisma.$queryRaw`SELECT * FROM Withdrawal WHERE userId = ${userId} and status = 0`;

     if(result3.length == 0){


      const newWithdrawal = await prisma.withdrawal.create({
        data: {
          userId: userId,
          amount: parseFloat(amount) ,
          prev_balance: 0,
          post_balance: 0,
          trxId: "no",
          status: "0",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      return NextResponse.json({
        status : 200,
        message : "Request has been submitted"
      });
    }else{
      return NextResponse.json({
        status : 200,
        message : "Already Request has Pending"
      });
    }
   

   
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