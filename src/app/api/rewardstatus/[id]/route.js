import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    const rewards = await prisma.$queryRaw`
      SELECT * FROM Rewards WHERE userId = ${parseInt(id)} AND DATE(createdAt) = ${formattedDate}
    `;
    
    if(rewards.length == 0){
        return NextResponse.json({
            status : 200,
            message : "false" 
       });
    }else{
        return NextResponse.json({
            status : 200,
            message : "true" 
       });
    }
   
  } catch (error) {
    console.log("Error fetching Rewards:", error);
    return NextResponse.json(
      { message: 'Failed to fetch Rewards', error: error.message },
      { status: 500 }
    );
  }
}