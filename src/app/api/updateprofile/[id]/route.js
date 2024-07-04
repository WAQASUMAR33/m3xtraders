import prisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
    const id = parseInt(params.id);
    try {

    const data = await request.json();
    const { name,accountNo, bankname, accounttitle, city, image, phoneno } = data;
    

  
      const updatedUser = await prisma.User.update({
        where: { id },
        data: { 
            name :name,
            accountNo: accountNo,
            bankname:bankname,
            accounttitle:accounttitle,
            city:city,
            image:"",
            phoneno:phoneno,
            updatedAt: new Date()
         },
      });
  
      return NextResponse.json(updatedUser);
    } catch (error) {
      console.log("Error updating user:", error);
      return NextResponse.json(
        { message: "Internal Server Error", status: false },
        { status: 500 }
      );
    }
  }