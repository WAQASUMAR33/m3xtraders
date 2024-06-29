import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';



export async function GET(request, { params }) {
  const { id } = params;
  try {
    const account = await prisma.account.findUnique({
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
    const { bankTitle, accountNo, acountTitle } = data;
    const id = parseInt(params.id);

    const updatedAccount = await prisma.account.update({
      where: {
        id: id,
      },
      data: {
        bankTitle: bankTitle,
        accountNo: accountNo,
        acountTitle: acountTitle,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(updatedAccount);
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
    const deletedAccount = await prisma.account.delete({
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