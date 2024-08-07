import { PrismaClient } from '@prisma/client';
import prisma from '../../../../lib/prisma';
import { NextResponse  } from 'next/server';

export async function GET(request, { params }) {
    const { id } = params;
    try {
      const referrals = await prisma.$queryRaw`SELECT * FROM ReferralBenefit WHERE userId = ${id}`;
      return NextResponse.json(referrals);
    } catch (error) {
      console.log("Error fetching Referrals:", error);
      return NextResponse.json(
        { message: 'Failed to fetch Referrals', error: error.message },
        { status: 500 }
      );
    }
  }
