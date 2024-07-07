import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    const { id, userId, pkgid } = data;



    const user_record = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${parseInt(userId)}`;
    
    const old_balance =  user_record[0].balance;

    const package_rcords = await prisma.$queryRaw`SELECT * FROM Package WHERE id = ${parseInt(pkgid)}`;

    const package_amount =  package_rcords[0].amount;

    

    if(parseFloat(old_balance) >= (parseFloat(package_amount)* 3)){

      return NextResponse.json({
        status: 200,
        message : "You have reached you 3x limit"
      }) ;

    }else{
        const commission = (package_amount / 100 ) * 2;

    const newReward = await prisma.Rewards.create({
      data: {
        userId : parseInt(userId) ,
        pkgid  : parseInt(pkgid),
        profit : commission,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    });



    const new_balance = commission +  old_balance;

    const updatedUser = await prisma.User.update({
      where: {
        id: parseInt(userId) ,
      },
      data: {
        balance: parseFloat(new_balance),
        updatedAt: new Date(),
      },
    });


      return NextResponse.json({
        status: 200,
        message : "Reward has been awarded"
      }) ;
    }

    } catch (error) {
    console.error('Error creating or updating Package:', error);
    return NextResponse.json(
      {
        message: 'Failed to create or update Package',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const packages = await prisma.Rewards.findMany();
    return NextResponse.json(packages);
  } catch (error) {
    console.log("Error fetching Rewards:", error);
    return NextResponse.json(
      { message: 'Failed to fetch Rewards', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await prisma.package.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Error deleting Package:', error);
    return NextResponse.json(
      {
        message: 'Failed to delete Package',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
