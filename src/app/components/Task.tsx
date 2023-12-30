import { Button } from "keep-react";
import React, { useState } from "react";
import { FaCheck, FaEdit, FaRegTrashAlt } from "react-icons/fa";
import MyModal from "./Modal";

type taskData = {
  id: string;
  title: string;
  isDeleted: boolean;
  isCompleted: boolean;
};
type TTask = {
  data?: taskData;
};
const Task: React.FC<TTask> = ({ data }) => {
  const { title, isDeleted, isCompleted, id } = data || {};
  const time = "Fri Dec 29 2023 22:21:08";
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskText, setTaskText] = useState(title);

  const onClickInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Perform any save/update functionality here if needed
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };
  const handleComplete = () => {};

  return (
    <div className="flex gap-4 p-3 rounded-md">
      <div className="flex gap-1 items-center">
        <Button
          size="xs"
          type="outlineGray"
          onClick={onClickInfoModal}
          circle={true}
        >
          <FaRegTrashAlt />
        </Button>
        <Button size="xs" type="outlineGray" circle={true} onClick={handleEdit}>
          <FaEdit />
        </Button>
        <Button
          size="xs"
          type="outlineGray"
          circle={true}
          className={`${isCompleted && "bg-indigo-400 hover:bg-indigo-400"} `}
          onClick={handleComplete}
        >
          <FaCheck className={`${isCompleted && "text-white"}`} />
        </Button>
      </div>
      <div>
        {isEditing ? (
          <input
            type="text"
            value={taskText}
            onChange={handleInputChange}
            onBlur={handleSave}
            onKeyDown={handleKeyPress}
            className="border border-gray-300 rounded px-2 py-1"
          />
        ) : (
          <>
            <h1
              className={`text-base font-semibold ${
                isCompleted && "line-through"
              }`}
            >
              {taskText}
            </h1>
            <p className="text-sm font-light">{time}</p>
          </>
        )}
      </div>
      <MyModal
        showInfoModal={showInfoModal}
        onClickInfoModal={onClickInfoModal}
      >
        <div className="flex items-center md:items-start gap-2">
          <h3 className="text-body-4 md:text-body-2 font-semibold text-metal-900">
            Are you want to delete the task?
          </h3>
        </div>
      </MyModal>
    </div>
  );
};

export default Task;
