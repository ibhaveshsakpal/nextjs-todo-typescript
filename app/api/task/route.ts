import Task from "@/models/task";
import { ResponseMessageTypes, TaskTypes } from "@/types/commonTypes";
import { ConnectDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await ConnectDB();
    const tasks: TaskTypes[] = await Task.find();

    const responseMessage: ResponseMessageTypes = {
      message: "Tasks fetched Successfully",
      data: tasks,
    };

    return new NextResponse(JSON.stringify(responseMessage), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Failed to Fetch Tasks" }),
      {
        status: 400,
      }
    );
  }
};
