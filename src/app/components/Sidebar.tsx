import React from "react";
import Profile from "./Profile";

const Sidebar = () => {
  return (
    <div>
      <Profile />
      <div className="flex gap-6 justify-center">
        <div className="p-2">
          <h1 className="text-xl font-bold text-center pb-3 text-indigo-500">
            0
          </h1>
          <h3 className="text-base font-semibold text-center">ToDo</h3>
          <h4 className="text-sm font-semibold text-center">tasks</h4>
        </div>
        <div className="p-2">
          <h1 className="text-xl font-bold text-center pb-3 text-indigo-500">
            0
          </h1>
          <h3 className="text-base font-semibold text-center">Completed</h3>
          <h4 className="text-sm font-semibold text-center">tasks</h4>
        </div>
        <div className="p-2">
          <h1 className="text-xl font-bold text-center pb-3 text-indigo-500">
            0
          </h1>
          <h3 className="text-base font-semibold text-center">Pending</h3>
          <h4 className="text-sm font-semibold text-center">tasks</h4>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
