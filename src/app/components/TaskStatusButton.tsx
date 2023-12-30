"use client";
import { Button } from "keep-react";
import React, { useState } from "react";

const TaskStatusButton = () => {
  const [activeStatus, setActiveStatus] = useState("ALL");

  const handleStatusChange = (status: string) => {
    setActiveStatus(status);
  };

  const getStatusButtonClass = (status: string) => {
    return `rounded-3xl ${
      activeStatus === status
        ? "bg-indigo-400 hover:bg-indigo-400 text-white"
        : ""
    }`;
  };

  return (
    <div className="">
      <div className="flex gap-2 items-center">
        <Button
          size="sm"
          type="outlineGray"
          className={getStatusButtonClass("ALL")}
          onClick={() => handleStatusChange("ALL")}
        >
          ALL
        </Button>
        <Button
          size="sm"
          type="outlineGray"
          circle={true}
          className={getStatusButtonClass("ACTIVE")}
          onClick={() => handleStatusChange("ACTIVE")}
        >
          ACTIVE
        </Button>
        <Button
          size="sm"
          type="outlineGray"
          circle={true}
          className={getStatusButtonClass("COMPLETED")}
          onClick={() => handleStatusChange("COMPLETED")}
        >
          COMPLETED
        </Button>
      </div>
    </div>
  );
};

export default TaskStatusButton;
