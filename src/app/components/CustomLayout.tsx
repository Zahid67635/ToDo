import React from "react";
import MySidebar from "./Sidebar";
import Header from "./Header";

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="md:w-1/3 bg-slate-50 pt-10 px-3 min-h-screen hidden md:block">
        <MySidebar />
      </div>
      <div className="md:w-2/3 w-full">
        <Header links={[]} />
        <div className="md:p-10 p-2">{children}</div>
      </div>
    </div>
  );
};

export default CustomLayout;
