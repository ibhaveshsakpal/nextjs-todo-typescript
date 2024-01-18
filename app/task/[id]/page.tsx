"use client";

import { TaskTypes } from "@/types/commonTypes";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const TaskPage = () => {
  const pathName = usePathname();
  const [taskData, setTaskData] = useState<TaskTypes>();

  const fetchTaskDetails = async () => {
    const queryParams = pathName.split("/");
    const taskId = queryParams[queryParams?.length - 1];

    try {
      const data = await fetch(`/api/task/${taskId}`);
      const response = await data.json();
      if (response?.data) {
        setTaskData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  return (
    <div>
      {taskData && taskData.task ? (
        <div className="p-5">
          <h1 className="text-3xl pb-3">Task Details </h1>
          <hr />

          <div className="flex">
            <label className="font-bold text-lg">Task Description:</label>
            <h3 className="text-lg ml-2">{taskData.task}</h3>
          </div>

          <div className="flex">
            <label className="font-bold text-lg">Status:</label>
            <h3 className="text-lg ml-2">
              {taskData.isCompleted ? "Completed" : "Incomplete"}
            </h3>
          </div>

          <div className="flex">
            <label className="font-bold text-lg">Created at:</label>
            <h3 className="text-lg ml-2">
              {new Date(taskData.created_at!).toDateString()}
            </h3>
          </div>
        </div>
      ) : (
        <>
          <h2>No task data found!</h2>
        </>
      )}
    </div>
  );
};

export default TaskPage;
