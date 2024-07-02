import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';



export async function POST(request) {
  try {
    const data = await request.json();
    const { bankTitle, accountNo, accountTitle } = data;

    const newAccount = await prisma.Account.create({
      data: {
        bankTitle: bankTitle,
        accountNo: accountNo,
        accountTitle: accountTitle,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(newAccount);
  } catch (error) {
    console.error('Error creating Account:', error);
    return NextResponse.json(
      {
        message: 'Failed to create Account',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const accounts = await prisma.Account.findMany();
    return NextResponse.json(accounts);
  } catch (error) {
    console.log("Error fetching Accounts:", error);
    return NextResponse.json(
      { message: 'Failed to fetch Accounts', error: error.message },
      { status: 500 }
    );
  }
}