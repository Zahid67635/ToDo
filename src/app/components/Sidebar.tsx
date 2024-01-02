"use client";
import React, { useState } from "react";
import Profile from "./Profile";
import { useQuery } from "react-query";
import { FaAlignJustify, FaRedoAlt } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

const MySidebar: React.FC = () => {
  let completedTask;
  let allTasksLength;
  const [translate, setTranslate] = useState(true);
  const { refetch, data: AllTasks = [] } = useQuery({
    queryKey: ["/tasks"],
    queryFn: async () => {
      try {
        const response = await fetch(
          "https://658fbf59cbf74b575eca1a39.mockapi.io/api/tasks/alltasks?isDeleted=false"
        );
        return response.json();
      } catch (error: any) {
        throw new Error(error);
      }
    },
  });

  // checking if no data found in the Alltasks
  if (AllTasks === "Not found") {
    completedTask = 0;
    allTasksLength = 0;
  } else {
    completedTask =
      AllTasks.filter(
        (t: { isCompleted: boolean }) => t.isCompleted === true
      ) || [];
    allTasksLength = AllTasks.length || 0;
  }

  const completedTaskLength = completedTask.length || 0;
  const pendingTaskLength = allTasksLength - completedTaskLength || 0;

  return (
    <div>
      <div className="absolute top-0 right-0 md:hidden block">
        <button
          onClick={() => setTranslate(!translate)}
          className="flex items-center gap-1 p-4 focus:outline-none"
        >
          <FaAlignJustify className="w-5 h-5" />
        </button>
      </div>

      {/* bg overlay after the sidebar appear in sm screen */}
      <div
        className={`${
          !translate && "md:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
        }`}
      >
        {/*sidebar in large screen and left-side drawer when the screen in sm */}
        <div
          className={`absolute inset-y-0 left-0 transform
      ${
        translate ? "-translate-x-full" : "bg-gray-100"
      } transition duration-300 ease-in-out
      md:translate-x-0 md:relative z-20  px-3`}
        >
          <div className="flex justify-between items-center mt-2">
            {/* refetch task numbers */}
            <button
              onClick={() => refetch()}
              className="flex items-center gap-1 p-3 focus:outline-none rounded-full bg-indigo-100"
            >
              <FaRedoAlt className="w-5 h-5" />
            </button>
            {/* toggle button */}
            <button className=" md:hidden" onClick={() => setTranslate(true)}>
              <FaCircleXmark className=" text-3xl text-red-400" />
            </button>
          </div>
          {/* showing user profile */}
          <Profile />

          <div className="flex gap-6 justify-center">
            <div className="p-2">
              <h1 className="text-xl font-bold text-center pb-3 text-indigo-500">
                {allTasksLength}
              </h1>
              <h3 className="text-base font-semibold text-center">Total</h3>
              <h4 className="text-sm font-semibold text-center">tasks</h4>
            </div>
            <div className="p-2">
              <h1 className="text-xl font-bold text-center pb-3 text-indigo-500">
                {completedTaskLength}
              </h1>
              <h3 className="text-base font-semibold text-center">Completed</h3>
              <h4 className="text-sm font-semibold text-center">tasks</h4>
            </div>
            <div className="p-2">
              <h1 className="text-xl font-bold text-center pb-3 text-indigo-500">
                {pendingTaskLength}
              </h1>
              <h3 className="text-base font-semibold text-center">Pending</h3>
              <h4 className="text-sm font-semibold text-center">tasks</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySidebar;
