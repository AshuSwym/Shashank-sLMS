import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PUT(
  req: Request
) {
  try {
    const { userId } = auth();
    const { email, name, feedback, courseId } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    } 

    const userFeedback = await db.feedback.create({
      data: {
        userId,
        courseId: courseId,
        email: email,
        name: name,
        feedback: feedback
      }
    })

    return NextResponse.json(userFeedback);
  } catch (error) {
    console.log("[CHAPTER_ID_PROGRESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    } 

    const userFeedback = await db.feedback.findMany();
    return NextResponse.json(userFeedback);
  } catch (error) {
    console.log("[FEEDBACK]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req:Request) {
  try{
    const {id} : any = await req.json();
    await db.feedback.delete({
      where: {
        id: id
      }
    })
    return new NextResponse("Delete", {status : 200});
  }
  catch (error) {
    console.log("[DELETE_FEEDBACK]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }

}