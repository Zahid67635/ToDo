"use client";
import React, { useState } from "react";
import Profile from "./Profile";
import { useQuery } from "react-query";
import { FaAlignJustify, FaCross } from "react-icons/fa";

const MySidebar = () => {
  const [translate, setTranslate] = useState(true);
  const {
    isLoading,
    isError,
    refetch,
    data: AllTasks = [],
    error,
  } = useQuery({
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
  const completedTask =
    AllTasks.filter((t: { isCompleted: boolean }) => t.isCompleted === true) ||
    [];
  const allTasksLength = AllTasks.length || 0;
  const completedTaskLength = completedTask.length || 0;
  const pendingTaskLength = AllTasks.length - completedTaskLength || 0;
  // flex flex-col justify-center
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
      <div
        className={`${
          !translate && "md:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
        }`}
      >
        <div
          className={`absolute inset-y-0 left-0 transform
      ${
        translate ? "-translate-x-full" : ""
      } transition duration-300 ease-in-out
      md:translate-x-0 md:relative z-20 bg-gray-50 px-3`}
        >
          <Profile setTranslate={setTranslate} />

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
