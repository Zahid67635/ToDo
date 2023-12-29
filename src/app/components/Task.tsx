"use client";
import { Button } from "keep-react";
import React from "react";
import { FaCheck, FaEdit, FaRegTrashAlt } from "react-icons/fa";

const Task = () => {
  const time = "Fri Dec 29 2023 22:21:08";
  return (
    <div className="flex gap-4 p-3 rounded-md">
      <div className="flex gap-1 items-center">
        <Button size="xs" type="outlineGray" circle={true}>
          <FaRegTrashAlt />
        </Button>
        <Button size="xs" type="outlineGray" circle={true}>
          <FaEdit />
        </Button>
        <Button size="xs" type="outlineGray" circle={true}>
          <FaCheck />
        </Button>
      </div>
      <div>
        <h1 className="text-base font-semibold">
          Implement the task sadsadsadsa
        </h1>
        <p className="text-sm font-light">{time}</p>
      </div>
    </div>
  );
};

export default Task;
