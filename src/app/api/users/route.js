import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';
import bcrypt from "bcryptjs";


export async function POST(request) {
  try {
    const data = await request.json();
    console.log(data);
    const { name, email, password,accountNo,bankname,accounttitle,city,image ,phoneno,balance,status,sponsorId} = data;

    const userFound = await prisma.User.findUnique({
      where: {
        email: email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: "Email already exists",
          status: 100,
        },
        {
          status: 200,
        },
      );
    }

    const usernameFound = await prisma.User.findUnique({
      where: {
        email: email,
      },
    });

    if (usernameFound) {
      return NextResponse.json(
        {
          message: "email already exists",
          status: 101,
        },
        {
          status: 200,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT),
    );

    const newUser = await prisma.User.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        accountNo:accountNo,
        bankname:bankname,
        accounttitle:accounttitle,
        city:city,
        image:image,
        phoneno:phoneno,
        balance:balance,
        status:status,
        sponsorId: sponsorId ? parseInt(sponsorId) : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

  
    if (sponsorId) {
      await prisma.ReferralBenefit.create({
        data: {
          userId: parseInt(sponsorId),
          amount: 120,
        },
       });
      }


    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json(
      {
        message: "failed to create user !!" + error,
        status: false,
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET() {
  try {
    const users = await prisma.User.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.log("Error Creating user :", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
