// import prisma from '../../../../../lib/prisma';
import prisma from '../../../../lib/prisma' ;
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const data = await request.json();
    const { action } = data;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid or missing 'id' parameter", status: false },
        { status: 400 }
      );
    }

    let status;
    if (action === 'activate') {
      status = 1;
    } else if (action === 'deactivate') {
      status = 0;
    } else {
      return NextResponse.json(
        { message: "Invalid action", status: false },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.User.update({
      where: { id: parseInt(id) },
      data: { status, updatedAt: new Date() },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error", status: false },
      { status: 500 }
    );
  }
}
