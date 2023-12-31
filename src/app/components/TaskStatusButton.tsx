"use client";
import { Button } from "keep-react";
import React from "react";

type TStatusProps = {
  setActiveStatus: (status: string) => void;
  activeStatus: string;
};
const TaskStatusButton: React.FC<TStatusProps> = ({
  setActiveStatus,
  activeStatus,
}) => {
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
      <div className="flex md:gap-2 gap-1 items-center">
        <Button
          size="xs"
          type="outlineGray"
          className={getStatusButtonClass("ALL")}
          onClick={() => handleStatusChange("ALL")}
        >
          ALL
        </Button>
        <Button
          size="xs"
          type="outlineGray"
          circle={true}
          className={getStatusButtonClass("ACTIVE")}
          onClick={() => handleStatusChange("ACTIVE")}
        >
          ACTIVE
        </Button>
        <Button
          size="xs"
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
