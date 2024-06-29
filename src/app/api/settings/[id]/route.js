import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';


export async function GET(request, { params }) {
  const { id } = params;
  try {
    const setting = await prisma.setting.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(setting);
  } catch (error) {
    console.log("Error fetching Setting:", error);
    return NextResponse.json(
      { message: 'Failed to fetch Setting', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { per_Level1, per_Level2, per_Level3, per_Profit, others } = data;
    const id = parseInt(params.id);

    const updatedSetting = await prisma.setting.update({
      where: {
        id: id,
      },
      data: {
        per_Level1: parseFloat(per_Level1),
        per_Level2: parseFloat(per_Level2),
        per_Level3: parseFloat(per_Level3),
        per_Profit: parseFloat(per_Profit),
        others: others,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(updatedSetting);
  } catch (error) {
    console.log("Error updating Setting:", error);
    return NextResponse.json(
      { message: 'Failed to update Setting', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    const deletedSetting = await prisma.setting.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deletedSetting);
  } catch (error) {
    console.log("Error deleting Setting:", error);
    return NextResponse.json(
      { message: 'Failed to delete Setting', error: error.message },
      { status: 500 }
    );
  }
}