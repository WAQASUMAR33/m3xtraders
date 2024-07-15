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

export async function PUT(request, { params }) {
  try {
    console.log('Request received at:', new Date());
    const { id } = params;
    console.log('Received ID:', id);

    const depositrecord = await prisma.$queryRaw`SELECT * FROM Deposit WHERE id = ${id}`;
    console.log('Deposit record fetched:', depositrecord);

    const userId = depositrecord[0].userId;
    const packageId = depositrecord[0].packageId;
    const amount = depositrecord[0].amount;

    const user_id = parseInt(userId);

    const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${user_id}`;
    console.log('User record fetched:', result);

    if (result.length === 0) {
      throw new Error("User not found");
    }

    const userlvel = result[0];

    if (!userlvel.sponsorId) {
      const newDeposit = await prisma.deposit.update({
        where: {
          id: parseInt(id),
        },
        data: {
          status: "1",
          updatedAt: new Date(),
        },
      });
      console.log('Deposit updated without sponsor:', newDeposit);

      const updatepackage = await prisma.User.update({
        where: {
          id: parseInt(userId),
        },
        data: {
          packageId: parseInt(packageId),
          status: 1,
          updatedAt: new Date(),
        },
      });
      console.log('User package updated without sponsor:', updatepackage);

      return NextResponse.json({
        status: 200,
        message: "No Referral Found. Package is activated.",
      });
    } else {
      let sponsorId = userlvel.sponsorId ? parseInt(userlvel.sponsorId) : 0;

      if (sponsorId != null) {
        const result1 = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${sponsorId}`;
        console.log('Level 1 sponsor record fetched:', result1);
        const userlvel_1 = result1[0];
        const sponsorId_1 = userlvel_1.sponsorId ? parseInt(userlvel_1.sponsorId) : null;

        const balance1 = userlvel_1.balance ? parseInt(userlvel_1.balance) : null;
        const commission = (amount / 100) * 7;
        const ubalance1 = balance1 + commission;

        await prisma.ReferralBenefit.create({
          data: {
            userId: parseInt(sponsorId),
            touser: userId + "",
            level: "level 1",
            amount: commission,
          },
        });
        console.log('Level 1 referral benefit created.');

        const updatebalance1 = await prisma.User.update({
          where: {
            id: sponsorId,
          },
          data: {
            balance: ubalance1,
            updatedAt: new Date(),
          },
        });
        console.log('Level 1 sponsor balance updated:', updatebalance1);

        if (sponsorId_1 != null) {
          const result3 = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${sponsorId_1}`;
          console.log('Level 2 sponsor record fetched:', result3);
          const userlvel_2 = result3[0];
          const sponsorId2 = userlvel_2.sponsorId ? parseInt(userlvel_2.sponsorId) : null;
          const balance2 = userlvel_2.balance ? parseInt(userlvel_2.balance) : null;
          const commission2 = (amount / 100) * 3;
          const ubalance2 = balance2 + commission2;

          await prisma.ReferralBenefit.create({
            data: {
              userId: parseInt(sponsorId_1),
              touser: userId + "",
              level: "level 2",
              amount: commission2,
            },
          });
          console.log('Level 2 referral benefit created.');

          const updatebalance2 = await prisma.User.update({
            where: {
              id: sponsorId_1,
            },
            data: {
              balance: ubalance2,
              updatedAt: new Date(),
            },
          });
          console.log('Level 2 sponsor balance updated:', updatebalance2);

          if (sponsorId2 != null) {
            const result4 = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${sponsorId2}`;
            console.log('Level 3 sponsor record fetched:', result4);
            const userlvel_3 = result4[0];
            const sponsorId3 = userlvel_3.sponsorId ? parseInt(userlvel_3.sponsorId) : null;
            const balance3 = userlvel_3.balance ? parseInt(userlvel_3.balance) : null;
            const commission3 = (amount / 100) * 2;
            const ubalance3 = balance3 + commission3;

            await prisma.ReferralBenefit.create({
              data: {
                userId: parseInt(sponsorId2),
                touser: userId + "",
                level: "level 3",
                amount: commission3,
              },
            });
            console.log('Level 3 referral benefit created.');

            const updatebalance3 = await prisma.User.update({
              where: {
                id: sponsorId2,
              },
              data: {
                balance: ubalance3,
                updatedAt: new Date(),
              },
            });
            console.log('Level 3 sponsor balance updated:', updatebalance3);
          }
        }

        const newDeposit = await prisma.deposit.update({
          where: {
            id: parseInt(id),
          },
          data: {
            status: "1",
            updatedAt: new Date(),
          },
        });
        console.log('Deposit updated with sponsor:', newDeposit);

        const updatepackage = await prisma.User.update({
          where: {
            id: parseInt(userId),
          },
          data: {
            packageId: parseInt(packageId),
            status: 1,
            updatedAt: new Date(),
          },
        });
        console.log('User package updated with sponsor:', updatepackage);

        return NextResponse.json({
          message: "Package Has Been Activated",
          status: 200,
        });
      }
    }
  } catch (error) {
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