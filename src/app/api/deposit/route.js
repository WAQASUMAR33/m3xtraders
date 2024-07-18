import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";


export async function POST(request) {

 try{
  const data = await request.json();
  const { userId, packageId, amount, trxId, status, imageurl } = data;



  const response = await fetch('https://appstore.store2u.ca/uploadImage.php', { // Replace with your actual endpoint URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: imageurl }),
  });

  const result = await response.json();
  if (response.ok) {
    console.log('Image URL:', result.image_url);

    const newDeposit = await prisma.deposit.create({
      data: {
        userId: parseInt(userId),
        packageId: parseInt(packageId),
        amount: parseFloat(amount),
        trxId: trxId,
        status: status,
        imageurl: result.image_url, // Save the GitHub file URL in the database
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
     return NextResponse.json({
      status : 200,
      message : "Your Request Has Submitted"
     });
  } else {
    console.error('Error:', result.error);
  }
 }
 catch (error) {
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
    const deposits = await prisma.$queryRaw`SELECT Deposit.* , User.name,User.email  FROM Deposit inner join User  on User.id =  Deposit.userId  order by Deposit.id desc `;
    return NextResponse.json(deposits);
  } catch (error) {
    console.log("Error fetching deposits:", error);
    return NextResponse.json(
      { message: "Failed to fetch deposits", error: error.message },
      { status: 500 }
    );
  }
}

