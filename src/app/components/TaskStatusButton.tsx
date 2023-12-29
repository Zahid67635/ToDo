"use client";
import { Button } from "keep-react";
import React from "react";

const TaskStatusButton = () => {
  return (
    <div className="">
      <div className="flex gap-2 items-center">
        <Button size="sm" type="outlineGray" className="rounded-3xl">
          ALL
        </Button>
        <Button size="sm" type="outlineGray" circle={true}>
          ACTIVE
        </Button>
        <Button size="sm" type="outlineGray" circle={true}>
          COMPLETED
        </Button>
      </div>
    </div>
  );
};

export default TaskStatusButton;
