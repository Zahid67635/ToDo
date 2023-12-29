/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button, Dropdown, Label, TextInput } from "keep-react";

import React, { useState } from "react";
import TaskStatusButton from "../components/TaskStatusButton";
import Task from "../components/Task";
import MyModal from "../components/Modal";

const page = () => {
  const myTasks = [{}, {}, {}];
  const [showInfoModal, setShowInfoModal] = useState(false);
  const onClickInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <Dropdown
          label="CATEGORIES"
          size="sm"
          type="outlineGray"
          dismissOnClick={true}
        >
          <Dropdown.Item>Refreshment</Dropdown.Item>
          <Dropdown.Item>Work</Dropdown.Item>
          <Dropdown.Item>Study</Dropdown.Item>
          <Dropdown.Item>Family</Dropdown.Item>
        </Dropdown>
        <TaskStatusButton />
      </div>
      <div className="my-10 space-y-1 max-h-96 overflow-y-auto">
        {myTasks.map((t, i) => (
          <Task key={i} />
        ))}
      </div>

      <Button size="md" className="mx-auto" onClick={onClickInfoModal}>
        NEW TASK
      </Button>
      <MyModal
        onClickInfoModal={onClickInfoModal}
        showInfoModal={showInfoModal}
      >
        <div className="mb-4">
          <Label htmlFor="#id-11" value="Add a task" />
          <TextInput
            id="#id-11"
            placeholder="type your task"
            color="gray"
            helperText="Info should be short and clear."
          />
        </div>
        <div className="w-full">
          <Label htmlFor="#id-11" value="Select Category" />
          <Dropdown
            label="CATEGORIES"
            size="sm"
            type="outlineGray"
            dismissOnClick={true}
            className="w-full"
          >
            <Dropdown.Item>Refreshment</Dropdown.Item>
            <Dropdown.Item>Work</Dropdown.Item>
            <Dropdown.Item>Study</Dropdown.Item>
            <Dropdown.Item>Family</Dropdown.Item>
          </Dropdown>
        </div>
      </MyModal>
    </div>
  );
};

export default page;
