import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
// import { uploadToGitHub } from '../../../lib/githubUploader';
// import fs from 'fs';
// import path from 'path';

export const config = () => ({
  api: {
    bodyParser: false,
  },
});

export async function POST(request) {

 try{
  const data = await request.json();
  const { userId, packageId, amount, trxId, status, imageurl } = data;

  const newDeposit = await prisma.deposit.create({
    data: {
      userId: parseInt(userId),
      packageId: parseInt(packageId),
      amount: parseFloat(amount),
      trxId: trxId,
      status: status,
      imageurl: "not Uploaded", // Save the GitHub file URL in the database
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
   return NextResponse.json({
    status : 200,
    message : "Your Request Has Submitted"
   })
 }
 catch (error) {
  console.error("Error creating Deposit:", error);
  return NextResponse.json(
    {
      message: "Failed to create Deposit",
      status: false,
      error: error.message,
    },
    { status: 500 }
  );
}

}

export async function GET() {
  try {
    const deposits = await prisma.$queryRaw`SELECT Deposit.* , User.name,User.email  FROM Deposit inner join User  on User.id =  Deposit.userId  order by Deposit.id desc `;
    return NextResponse.json(deposits);
  } catch (error) {
    console.log("Error fetching deposits:", error);
    return NextResponse.json(
      { message: "Failed to fetch deposits", error: error.message },
      { status: 500 }
    );
  }
}
