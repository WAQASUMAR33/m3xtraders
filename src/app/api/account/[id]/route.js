import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';



export async function GET(request, { params }) {
  const { id } = params;
  try {
    const account = await prisma.Account.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(account);
  } catch (error) {
    console.log("Error fetching Account:", error);
    return NextResponse.json(
      { message: 'Failed to fetch Account', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { bankTitle, accountNo, accountTitle } = data;
    const id = parseInt(params.id);

    const updatedAccount = await prisma.Account.update({
      where: {
        id: id,
      },
      data: {
        bankTitle: bankTitle,
        accountNo: accountNo,
        accountTitle: accountTitle,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json({
       status: 200,
       message: "Account has been updated"
    });
  } catch (error) {
    console.log("Error updating Account:", error);
    return NextResponse.json(
      { message: 'Failed to update Account', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    const deletedAccount = await prisma.Account.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deletedAccount);
  } catch (error) {
    console.log("Error deleting Account:", error);
    return NextResponse.json(
      { message: 'Failed to delete Account', error: error.message },
      { status: 500 }
    );
  }
}