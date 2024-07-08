import { PrismaClient } from '@prisma/client';
import prisma from '../../../../lib/prisma';
import { NextResponse  } from 'next/server';

export async function GET(request, { params }) {
    const { id } = params;
    const level = "level 3";
    try {
      const referrals = await prisma.$queryRaw`SELECT * FROM ReferralBenefit WHERE touser = ${id} and level = ${level} `;
      return NextResponse.json(referrals);
    } catch (error) {
      console.log("Error fetching Referrals:", error);
      return NextResponse.json(
        { message: 'Failed to fetch Referrals', error: error.message },
        { status: 500 }
      );
    }
  }
