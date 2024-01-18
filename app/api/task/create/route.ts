import Task from "@/models/task";
import { ResponseMessageTypes, TaskTypes } from "@/types/commonTypes";
import { ConnectDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { task }: TaskTypes = await req.json();

  try {
    await ConnectDB();

    const createdTask = new Task({
      task: task,
    });
    await createdTask.save();

    const responseMessage: ResponseMessageTypes = {
      message: "Task saved successfully",
      data: createdTask,
    };

    return new NextResponse(JSON.stringify(responseMessage), { status: 200 });
  } catch (error) {
    const responseMessage: ResponseMessageTypes = {
      message: "Failed to save task",
    };
    return new NextResponse(JSON.stringify(responseMessage), { status: 400 });
  }
};
