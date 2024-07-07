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
  try {
    const data = await request.json();
    const { userId, packageId, amount, trxId, status, imageurl } = data;

    const user_id = parseInt(userId);

    const result =
      await prisma.$queryRaw`SELECT * FROM User WHERE id = ${user_id}`;

    if (result.length === 0) {
      throw new Error("User not found");
    }

    //   Give the profit to first User

    const userlvel = result[0];

    if (!userlvel.sponsorId) {
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



      const updatepackage = await prisma.User.update({
        where: {
          id: parseInt(userId) ,
        },
        data: {
          packageId: parseInt(packageId),
          updatedAt: new Date(),
        },
      });


      
      return NextResponse.json({
        status: 200,
        message: "No Referal Found Package is activated.",
      });
    } else {
      let sponsorId = userlvel.sponsorId ? parseInt(userlvel.sponsorId) : 0;

      if (sponsorId != null) {
        const result1 =
          await prisma.$queryRaw`SELECT * FROM User WHERE id = ${sponsorId}`;
        const userlvel_1 = result1[0];
        const sponsorId_1 = userlvel_1.sponsorId
          ? parseInt(userlvel_1.sponsorId)
          : null;

        const balance1 = userlvel_1.balance
          ? parseInt(userlvel_1.balance)
          : null;
        const commission = (amount / 100) * 7;
        const ubalance1 = balance1 + commission;

        //           Start working for level 1
        await prisma.ReferralBenefit.create({
          data: {
            userId: parseInt(sponsorId),
            touser: userId,
            level: "level 1",
            amount: commission,
          },
        });

        const updatebalance1 = await prisma.User.update({
          where: {
            id: sponsorId,
          },
          data: {
            balance: ubalance1,
            updatedAt: new Date(),
          },
        });

        //----------------------------------------------------------------------------------------------------------------------

        if (sponsorId_1 != null) {
          const result3 =
            await prisma.$queryRaw`SELECT * FROM User WHERE id = ${sponsorId_1}`;
          const userlvel_2 = result3[0];
          const sponsorId2 = userlvel_2.sponsorId
            ? parseInt(userlvel_2.sponsorId)
            : null;
          const balance2 = userlvel_2.balance
            ? parseInt(userlvel_2.balance)
            : null;
          const commission2 = (amount / 100) * 3;
          const ubalance2 = balance2 + commission2;




            //           Start working for level 1
            await prisma.ReferralBenefit.create({
              data: {
                userId: parseInt(sponsorId_1),
                touser: userId,
                level:  "level 2",
                amount: commission2,
              },
            });
      
      
            const updatebalance2 = await prisma.User.update({
              where: {
                id: sponsorId_1,
              },
              data: {
                balance: ubalance2,
                updatedAt: new Date(),
              },
            });

        

              //********************************************************************************************************* 

              if(sponsorId2 != null){

                const result4 = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${sponsorId2}`;
                const userlvel_3 = result4[0];
                const sponsorId3 = userlvel_3.sponsorId ? parseInt(userlvel_3.sponsorId) : null;
                const balance3 = userlvel_3.balance ? parseInt(userlvel_3.balance) : null;
            
                const commission3 = (amount / 100 ) * 2;
                const ubalance3 = balance3 + commission3;



                await prisma.ReferralBenefit.create({
                  data: {
                    userId: parseInt(sponsorId2),
                    touser: userId,
                    level:  "level 3",
                    amount: commission3,
                  },
                });

                const updatebalance3 = await prisma.User.update({
                  where: {
                    id: sponsorId2,
                  },
                  data: {
                    balance: ubalance3,
                    updatedAt: new Date(),
                  },
                });
              }
              //********************************************************************************************************* 
        }


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
    
    
  
    
        const updatepackage = await prisma.User.update({
          where: {
            id: parseInt(userId) ,
          },
          data: {
            packageId: parseInt(packageId),
            updatedAt: new Date(),
          },
        });


        return NextResponse.json({
          "message" : "Package Has Been Activated",
          status: 200
        });


        //----------------------------------------------------------------------------------------------------------------------
      } //  end of first if scopess 
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

export async function GET() {
  try {
    const deposits = await prisma.deposit.findMany();
    return NextResponse.json(deposits);
  } catch (error) {
    console.log("Error fetching deposits:", error);
    return NextResponse.json(
      { message: "Failed to fetch deposits", error: error.message },
      { status: 500 }
    );
  }
}
