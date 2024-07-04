import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { uploadToGitHub } from '../../../lib/githubUploader';
import fs from 'fs';
import path from 'path';



export const config = () => ({
  api: {
    bodyParser: false,
  },
});

export async function POST(request) {
  try {
    const data = await request.json();
    const { userId, packageId, amount, trxId, status, imageurl } = data;

    if (!imageurl) {
      return NextResponse.json({ message: 'No image provided', status: false }, { status: 400 });
    }

    // Decode base64 string and save the file
    const base64Data = imageurl.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Generate a unique filename
    const filename = `image_${Date.now()}.jpg`;

    // Upload the file to GitHub
    const fileUrl = await uploadToGitHub(buffer, filename);

    const newDeposit = await prisma.deposit.create({
      data: {
        userId: parseInt(userId),
        packageId: parseInt(packageId),
        amount: parseFloat(amount),
        trxId: trxId,
        status: status,
        imageurl: fileUrl, // Save the GitHub file URL in the database
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
    console.log('Error fetching deposits:', error);
    return NextResponse.json(
      { message: 'Failed to fetch deposits', error: error.message },
      { status: 500 }
    );
  }
}
