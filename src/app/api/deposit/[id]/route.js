import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';


export async function GET(request, { params }) {
  const { id } = params;
  try {
    const deposits = await prisma.$queryRaw`SELECT * FROM Deposit WHERE userId = ${id}`;
    return NextResponse.json(deposits);
  } catch (error) {
    console.log("Error fetching Deposit:", error);
    return NextResponse.json(
      { message: 'Failed to fetch Deposit', error: error.message },
      { status: 500 }
    );
  }
}


const prismaQueryWithTimeout = async (queryPromise, timeout = 12000) => {
  return Promise.race([
    queryPromise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Query timed out')), timeout)
    ),
  ]);
};




export async function PUT(request, { params }) {
  try {
    const { id } = params;

    console.log('Request received at:', new Date());
    console.log('Received ID:', id);

    // Use the utility function to add timeout to Prisma queries
    const depositrecord = await prismaQueryWithTimeout(
      prisma.$queryRaw`SELECT * FROM Deposit WHERE id = ${id}`,
      5000 // Timeout after 5 seconds
    );
    if (!depositrecord.length) {
      throw new Error('Deposit record not found');
    }
    console.log('Deposit record fetched:', depositrecord);

    const { userId, packageId, amount } = depositrecord[0];
    const user_id = parseInt(userId);

    const result = await prismaQueryWithTimeout(
      prisma.$queryRaw`SELECT * FROM User WHERE id = ${user_id}`,
      5000 // Timeout after 5 seconds
    );
    if (!result.length) {
      throw new Error('User not found');
    }
    console.log('User record fetched:', result);

    const userlvel = result[0];

    const updateUserAndDeposit = async () => {
      await prismaQueryWithTimeout(
        prisma.deposit.update({
          where: { id: parseInt(id) },
          data: { status: '1', updatedAt: new Date() },
        }),
        5000 // Timeout after 5 seconds
      );

      await prismaQueryWithTimeout(
        prisma.User.update({
          where: { id: parseInt(userId) },
          data: { packageId: parseInt(packageId), status: 1, updatedAt: new Date() },
        }),
        5000 // Timeout after 5 seconds
      );

      console.log('User and deposit updated.');
    };

    if (!userlvel.sponsorId) {
      await updateUserAndDeposit();

      return NextResponse.json({
        status: 200,
        message: 'No Referral Found. Package is activated.',
      });
    } else {
      let sponsorId = userlvel.sponsorId ? parseInt(userlvel.sponsorId) : 0;
      if (sponsorId != null) {
        const handleReferralLevel = async (sponsorId, level, commissionRate) => {
          const result = await prismaQueryWithTimeout(
            prisma.$queryRaw`SELECT * FROM User WHERE id = ${sponsorId}`,
            5000 // Timeout after 5 seconds
          );
          if (!result.length) return null;

          const userlvel = result[0];
          const nextSponsorId = userlvel.sponsorId ? parseInt(userlvel.sponsorId) : null;
          const balance = userlvel.balance ? parseInt(userlvel.balance) : 0;
          const commission = (amount / 100) * commissionRate;
          const ubalance = balance + commission;

          await prismaQueryWithTimeout(
            prisma.ReferralBenefit.create({
              data: {
                userId: sponsorId,
                touser: userId.toString(),
                level,
                amount: commission,
              },
            }),
            5000 // Timeout after 5 seconds
          );

          await prismaQueryWithTimeout(
            prisma.User.update({
              where: { id: sponsorId },
              data: { balance: ubalance, updatedAt: new Date() },
            }),
            5000 // Timeout after 5 seconds
          );

          return nextSponsorId;
        };

        sponsorId = await handleReferralLevel(sponsorId, 'level 1', 7);
        if (sponsorId != null) {
          sponsorId = await handleReferralLevel(sponsorId, 'level 2', 3);
          if (sponsorId != null) {
            await handleReferralLevel(sponsorId, 'level 3', 2);
          }
        }

        await updateUserAndDeposit();

        return NextResponse.json({
          message: 'Package Has Been Activated',
          status: 200,
        });
      }
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      {
        message: 'Failed to process request',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}



export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    const deletedDeposit = await prisma.deposit.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deletedDeposit);
  } catch (error) {
    console.log("Error deleting Deposit:", error);
    return NextResponse.json(
      { message: 'Failed to delete Deposit', error: error.message },
      { status: 500 }
    );
  }
}