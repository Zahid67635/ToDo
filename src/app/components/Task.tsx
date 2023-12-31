import { Button } from "keep-react";
import React, { useState } from "react";
import { FaCheck, FaEdit, FaRegTrashAlt } from "react-icons/fa";
import MyModal from "./Modal";
import { useMutation } from "react-query";

type taskData = {
  id: string;
  title: string;
  isDeleted: boolean;
  isCompleted: boolean;
  createdAt: string;
};
type TTask = {
  data?: taskData;
  refetch: () => void;
};
const Task: React.FC<TTask> = ({ data, refetch }) => {
  const { title, isDeleted, isCompleted, id, createdAt } = data || {};

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
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };
  const { mutateAsync: addTask } = useMutation({
    mutationFn: async (data: object) => {
      const res = await fetch(
        `https://658fbf59cbf74b575eca1a39.mockapi.io/api/tasks/alltasks/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      return res.json();
    },
  });
  const { mutateAsync: deleteTask } = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `https://658fbf59cbf74b575eca1a39.mockapi.io/api/tasks/alltasks/${id}`,
        {
          method: "DELETE",
        }
      );
      return res.json();
    },
  });
  const handleComplete = async () => {
    try {
      const data = { isCompleted: !isCompleted };
      await addTask(data);
      refetch();
    } catch (er) {
      console.log(er);
    }
  };

  const handleDelete = async () => {
    await deleteTask();
    setShowInfoModal(!showInfoModal);
    refetch();
  };
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
              className={`md:text-base text-sm font-semibold ${
                isCompleted && "line-through"
              }`}
            >
              {taskText}
            </h1>
            <p className="md:text-sm text-xs font-light">{createdAt}</p>
          </>
        )}
      </div>
      <MyModal
        showInfoModal={showInfoModal}
        onClickInfoModal={onClickInfoModal}
      >
        <div className="flex items-center md:items-start gap-2">
          <h3 className="text-body-4 md:text-body-2 font-semibold text-metal-900">
            Are you sure to delete the task?
          </h3>
        </div>
        <div className="flex justify-center gap-4 pt-6">
          <Button type="outlineGray" size="xs" onClick={onClickInfoModal}>
            Cancel
          </Button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-indigo-500 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </MyModal>
    </div>
  );
};

export default Task;
