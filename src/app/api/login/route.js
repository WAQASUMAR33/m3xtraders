import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function POST(request) {
  const { email, password } = await request.json();

  try {
    const user_ = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user_ == null) {
      throw new Error("User not Found !");
    } else {
      const res = bcrypt.compareSync(password, user_.password);
      if (!res) {
        throw new Error("Password Not Matched !");
      } else {
        // Generete JWT Token

        const token = jwt.sign(
          {
            id: user_.id,
            name: user_.name,
          },
          process.env.JWT_KEY,
        );

        // create next response and save in cookie

        const response = NextResponse.json({
          message: "Login Successfully",
          success: true,
        });

        response.cookies.set("authToken", token, {
          expiresIn: "id",
          httpOnly: false,
        });


        
        return NextResponse.json();
      }
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
