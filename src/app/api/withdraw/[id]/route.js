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
   
    const id = parseInt(params.id);

    const deposits = await prisma.$queryRaw`SELECT Withdrawal.*, User.balance from Withdrawal inner join User on User.id = Withdrawal.userId  where Withdrawal.id = ${id}`;
 
    let userId = deposits[0].userId;
    let balance = deposits[0].balance;
    let amount = deposits[0].amount;
    let newBalace = balance - amount;




    const updatedWithdrawal = await prisma.Withdrawal.update({
      where: {
        id: id,
      },
      data: {
        prev_balance: balance,
        post_balance: newBalace,
        status: "1",
        updatedAt: new Date(),
      },
    });


    const updatedUser = await prisma.User.update({
      where: {
        id: userId,
      },
      data: {
        balance: newBalace,
        updatedAt: new Date(),
      },
    });


    return NextResponse.json({
      status: 200,
      message : "Successfully Withdrawl"
    });
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