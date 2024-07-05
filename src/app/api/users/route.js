import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {

  
    const data = await request.json();
    const { name, email, password, accountNo, bankname, accounttitle, city, image, phoneno, balance, status, sponsorId } = data;

    const userFound = await prisma.User.findUnique({
      where: { email },
    });

    if (userFound) {
      return NextResponse.json(
        { message: "Email already exists", status: 100 },
        { status: 200 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));

    const newUser = await prisma.User.create({
      data: {
        name,
        email,
        password: hashedPassword,
        accountNo,
        bankname,
        accounttitle,
        city,
        image,
        phoneno,
        balance,
        status,
        sponsorId: sponsorId ? parseInt(sponsorId) : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

   
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to create user: ${error.message}`, status: false },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const users = await prisma.User.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.log("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal Server Error", status: false },
      { status: 500 }
    );
  }
}
