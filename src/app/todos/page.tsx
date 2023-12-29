"use client";
import { Button, Dropdown } from "keep-react";

import React from "react";
import TaskStatusButton from "../components/TaskStatusTab";
import Task from "../components/Task";

const page = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <Dropdown
          label="CATEGORIES"
          size="sm"
          type="outlineGray"
          dismissOnClick={true}
        >
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <TaskStatusButton />
      </div>
      <div className="my-10 space-y-1 max-h-96 overflow-y-auto">
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
      <Button size="md" className="mx-auto">
        NEW TASK
      </Button>
    </div>
  );
};

export default page;
