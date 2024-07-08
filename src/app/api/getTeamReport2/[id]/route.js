import { PrismaClient } from '@prisma/client';
import prisma from '../../../../lib/prisma';
import { NextResponse  } from 'next/server';

export async function GET(request, { params }) {
    const { id } = params;
    const level = "level 2";
    try {
      const referrals = await prisma.$queryRaw`SELECT ReferralBenefit.*,User.name,User.email FROM ReferralBenefit inner join User on User.id = ReferralBenefit.userId   WHERE ReferralBenefit.touser = ${id} and ReferralBenefit.level = ${level} `;

      return NextResponse.json(referrals);
    } catch (error) {
      console.log("Error fetching Referrals:", error);
      return NextResponse.json(
        { message: 'Failed to fetch Referrals', error: error.message },
        { status: 500 }
      );
    }
  }
