import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    const { userId, amount, level } = data;

    const newUserBenefit = await prisma.userBenefit.create({
      data: {
        userId: parseInt(userId),
        amount: parseFloat(amount),
        level: parseInt(level),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(newUserBenefit);
  } catch (error) {
    console.error('Error creating UserBenefit:', error);
    return NextResponse.json(
      {
        message: 'Failed to create UserBenefit',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const userBenefits = await prisma.userBenefit.findMany();
    return NextResponse.json(userBenefits);
  } catch (error) {
    console.log("Error fetching UserBenefits:", error);
    return NextResponse.json(
      { message: 'Failed to fetch UserBenefits', error: error.message },
      { status: 500 }
    );
  }
}