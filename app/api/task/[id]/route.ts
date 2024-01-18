import Task from "@/models/task";
import { ResponseMessageTypes, TaskTypes } from "@/types/commonTypes";
import { ConnectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }: Params) => {
  try {
    await ConnectDB();

    await Task.findByIdAndDelete({ _id: new ObjectId(params?.id) });

    const responseMessage: ResponseMessageTypes = {
      message: "Deleted Task Successfully",
    };

    return new NextResponse(JSON.stringify(responseMessage), { status: 200 });
  } catch (error) {
    const responseMessage: ResponseMessageTypes = {
      message: "Failed to delete Task",
    };
    return new NextResponse(JSON.stringify(responseMessage), { status: 400 });
  }
};

export const PATCH = async (req: any, { params }: any) => {
  const { isCompleted, task }: TaskTypes = await req.json();
  try {
    await ConnectDB();

    const updatedFields: TaskTypes = {};

    if (isCompleted !== undefined) {
      updatedFields.isCompleted = isCompleted;
    }
    if (task !== undefined) {
      updatedFields.task = task;
    }

    const taskStatus = await Task.findByIdAndUpdate(
      { _id: new ObjectId(params?.id) },
      updatedFields,
      { new: true }
    );

    const responseMessage: ResponseMessageTypes = {
      message: "Task updated successfully",
      data: taskStatus,
    };

    return new NextResponse(JSON.stringify(responseMessage), { status: 200 });
  } catch (error) {
    const responseMessage: ResponseMessageTypes = {
      message: "Failed to update Task",
    };
    return new NextResponse(JSON.stringify(responseMessage), { status: 400 });
  }
};

export const GET = async (req: NextRequest, { params }: Params) => {
  const taskId: string = params?.id;

  try {
    await ConnectDB();

    let task = await Task.findOne({ _id: new ObjectId(taskId) });

    const responseMessage: ResponseMessageTypes = {
      message: "Tasks fetched Successfully",
      data: task,
    };

    return new NextResponse(JSON.stringify(responseMessage), { status: 200 });
  } catch (error) {
    const responseMessage: ResponseMessageTypes = {
      message: "Failed to Fetch Tasks",
    };
    return new NextResponse(JSON.stringify(responseMessage), { status: 400 });
  }
};
