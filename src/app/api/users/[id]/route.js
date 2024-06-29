import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';


export async function GET(request, { params }) {
  const id = parseInt(params.id);
  try {
    const users = await prisma.User.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.log("Error Creating user :", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    console.log(data);
    const {  name,accountNo,bankname,accounttitle,city,phoneno,balance } = data;
    const id = parseInt(params.id);
    const updateUsers = await prisma.User.update({
      where: {
        id: id,
      },
      data: {
         name:name,
         accountNo:accountNo,
         bankname:bankname,
         accounttitle:accounttitle,
         city:city,
         phoneno:phoneno,
         balance:balance,
         updated_at: new Date(),
      },
    });
    return NextResponse.json(updateUsers);
  } catch (error) {
    console.log("Error Creating user :", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    const deleteUser = await prisma.User.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deleteUser);
  } catch (error) {
    console.log("Error Creating user :", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
