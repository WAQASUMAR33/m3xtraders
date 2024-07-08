import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";



export async function GET() {
  try {
    const pending_withdrawals = await prisma.$queryRaw`Select count(id) as count from Withdrawal where status = 0`;
    const pending_deposits = await prisma.$queryRaw`Select count(id) as count from Deposit where status = 0`;
    const users = await prisma.$queryRaw`Select count(id) as count from User`;
    const total_deposits = await prisma.$queryRaw`Select sum(amount) as total from Deposit where status = 1`;
    
    return NextResponse.json({
        total_users: Number(users[0].count),
        pending_deposits: Number(pending_deposits[0].count),
        pending_withdrawals: Number(pending_withdrawals[0].count),
        total_deposits: total_deposits[0].total ? Number(total_deposits[0].total) : 0 // Handle null case
    });


  } catch (error) {
    console.log("Error fetching deposits:", error);
    return NextResponse.json(
      { message: "Failed to fetch deposits", error: error.message },
      { status: 500 }
    );
  }
}
