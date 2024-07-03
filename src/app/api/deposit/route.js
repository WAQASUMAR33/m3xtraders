import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';


import fs from "fs";
import path from "path";


export async function POST(request) {
  try {
    const data = await request.json();
    const { userId, packageId, amount, trxId, status, imageurl } = data;


    const buffer = Buffer.from(imageurl, "base64");
    // Generate a unique file name
    const fileName = `image_${Date.now()}.jpg`;
    // Specify the path where the file will be saved
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);
    // Write buffer to file
    fs.writeFileSync(filePath, buffer);



    const newDeposit = await prisma.deposit.create({
      data: {
        userId: parseInt(userId),
        packageId: parseInt(packageId),
        amount: parseFloat(amount),
        trxId: trxId,
        status: status,
        imageurl: fileName,
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