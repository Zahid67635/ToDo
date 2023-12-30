/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button, Dropdown, Label, TextInput } from "keep-react";

import React, { useState } from "react";
import TaskStatusButton from "../components/TaskStatusButton";
import Task from "../components/Task";
import MyModal from "../components/Modal";

const page = () => {
  const myTasks = [
    {
      id: "1",
      title: "I have to make an app",
      isCompleted: false,
      isDeleted: false,
    },
    {
      id: "2",
      title: "I have to make an web",
      isCompleted: false,
      isDeleted: false,
    },
    ,
    {
      id: "3",
      title: "I have to make an soft",
      isCompleted: true,
      isDeleted: false,
    },
  ];
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
          <Dropdown.Item value="Refreshment">Refreshment</Dropdown.Item>
          <Dropdown.Item value="Work">Work</Dropdown.Item>
          <Dropdown.Item value="Study">Study</Dropdown.Item>
          <Dropdown.Item value="Family">Family</Dropdown.Item>
        </Dropdown>
        <TaskStatusButton />
      </div>
      <div className="my-10 space-y-1 max-h-96 overflow-y-auto">
        {myTasks?.map((t, i) => (
          <Task key={i} data={t} />
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
