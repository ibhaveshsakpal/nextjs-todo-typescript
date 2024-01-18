"use client";

import { TaskTypes } from "@/types/commonTypes";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [task, setTask] = useState<string>("");
  const [taskData, setTaskData] = useState<TaskTypes[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>();
  const [editText, setEditText] = useState<string | null>();
  const [taskCount, setTaskCount] = useState<number>();

  const fetchTasks = async () => {
    const data = await fetch(`/api/task`);
    const response = await data.json();
    if (response?.data) {
      setTaskCount(response?.data.length);
      setTaskData(response?.data);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      task: task,
    };
    if (task) {
      try {
        const response: Response = await fetch("/api/task/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          fetchTasks();
          setTask("");
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const handleComplete = async (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const response: Response = await fetch(`/api/task/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isCompleted: e.target.checked }),
      });
      if (response.ok) {
        fetchTasks();
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelte = confirm("Are you sure want to delte the task?");
    if (confirmDelte) {
      try {
        const response: Response = await fetch(`/api/task/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchTasks();
        }
      } catch (error: any) {
        console.error(error);
      }
    }
  };

  const handleUpdate = async (task: string, id: string) => {
    if (editText && editText !== task) {
      try {
        const response = await fetch(`/api/task/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ task: editText }),
        });
        if (response.ok) {
          setEditText(null);
          fetchTasks();
        }
      } catch (error: any) {
        console.error(error);
      }
    }
  };

  const handleEditChange = (e: any) => {
    setEditText(e.target.value);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4 mt-5">
        <div className="flex items-center justify-center">
          <input
            type="text"
            value={task}
            onChange={handleChange}
            placeholder="Add a new task..."
            className="w-1/2 p-2 border rounded-md shadow-lg focus:outline-none focus:border-[#609EA2]"
          />
          <button
            type="submit"
            className="bg-[#609EA2] font-semibold text-[#F0EEED] p-1.5 ml-3 rounded-md"
          >
            Add Task
          </button>
        </div>
      </form>
      <div className="m-5">
        {taskCount! > 0 && (
          <div className="flex justify-end">
            <span className="text-sm">Task Count: {taskCount}</span>
          </div>
        )}
        {taskData.length > 0 ? (
          taskData.map((data, index) => (
            <div
              key={data._id}
              className="w-full m-2 p-3 border-b-4 border-x-4 rounded-lg flex justify-between bg-transparent"
            >
              <div className="flex items-center">
                <input
                  className="mr-2 w-4 h-4"
                  type="checkbox"
                  onChange={(e) => handleComplete(data._id!, e)}
                  checked={data.isCompleted}
                />
                <div onDoubleClick={() => setEditingIndex(index)} key={index}>
                  {editingIndex === index ? (
                    <input
                      className="border rounded-md shadow-lg focus:outline-none focus:border-[#609EA2] p-1"
                      type="text"
                      onChange={(e) => handleEditChange(e)}
                      onBlur={() => {
                        setEditingIndex(null);
                        handleUpdate(data.task!, data._id!);
                      }}
                      value={
                        editText && editText !== null ? editText : data.task
                      }
                    />
                  ) : (
                    <>
                      <p
                        className={
                          data.isCompleted == true
                            ? "line-through font-medium"
                            : "font-medium"
                        }
                      >
                        {data.task}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <Link href={`/task/${data._id}`}>
                  <img
                    className="cursor-pointer mr-2"
                    src="/view.png"
                    width={30}
                    alt="view icon"
                  />
                </Link>
                <img
                  className="cursor-pointer"
                  src="/trash.png"
                  width={30}
                  alt="trash icon"
                  onClick={() => handleDelete(data._id!)}
                />
              </div>
            </div>
          ))
        ) : (
          <>
            <p className="text-gray-400 flex justify-center">
              No tasks to show
            </p>
          </>
        )}
      </div>
    </div>
  );
}
