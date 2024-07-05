import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const userBenefit = await prisma.ReferralBenefit.findMany({
      where: {
        userId: parseInt(id),
      },
    });
    return NextResponse.json(userBenefit);
  } catch (error) {
    console.log("Error fetching UserBenefit:", error);
    return NextResponse.json(
      { message: 'Failed to fetch UserBenefit', error: error.message },
      { status: 500 }
    );
  }
}
