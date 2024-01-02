import { Button } from "keep-react";
import React, { useState } from "react";
import { FaCheck, FaEdit, FaFlag, FaRegTrashAlt } from "react-icons/fa";
import MyModal from "./Modal";
import { useMutation } from "react-query";
import toast from "react-hot-toast";

type taskData = {
  id: string;
  title: string;
  isDeleted: boolean;
  isCompleted: boolean;
  createdAt: string;
  category: string;
};
type TTask = {
  data?: taskData;
  refetch: () => void;
};
const Task: React.FC<TTask> = ({ data, refetch }) => {
  const { title, isCompleted, id, createdAt, category } = data || {};

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskText, setTaskText] = useState(title);
  const { mutateAsync: modifyTask } = useMutation({
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
  const onClickInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  };

  const handleSave = async () => {
    setIsEditing(false);
    await modifyTask({ title: taskText });
    toast.success("Title edited successfully!!");
    refetch();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleComplete = async () => {
    try {
      const data = { isCompleted: !isCompleted };
      await modifyTask(data);
      refetch();
    } catch (er) {
      console.log(er);
      toast.error("Something Wrong!");
    }
  };

  const handleDelete = async () => {
    await deleteTask();
    toast.success("Task Deleted Successfully!");
    setShowInfoModal(!showInfoModal);
    refetch();
  };
  return (
    <div className="flex md:flex-row flex-col-reverse gap-4 p-3 rounded-md md:items-center md:justify-between border w-full">
      <div className="flex md:flex-row flex-col gap-3 items-center md:w-3/4">
        <div className="md:flex gap-2 items-center hidden">
          <Button
            size="xs"
            type="outlineGray"
            onClick={onClickInfoModal}
            circle={true}
          >
            <FaRegTrashAlt />
          </Button>
          <Button
            size="xs"
            type="outlineGray"
            circle={true}
            onClick={handleEdit}
          >
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
        <div className="w-full">
          {isEditing ? (
            <input
              type="text"
              value={taskText}
              onChange={handleInputChange}
              onBlur={handleSave}
              onKeyDown={handleKeyPress}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          ) : (
            <div>
              <h1
                className={`md:text-base text-sm font-semibold text-wrap max-w-full break-words ${
                  isCompleted && "line-through"
                }`}
              >
                {taskText}
              </h1>
              <p className="md:text-sm text-xs font-light pt-1">
                {createdAt?.slice(0, 16)}
              </p>
            </div>
          )}
        </div>
        <div className="md:hidden flex gap-2 items-center ">
          <Button
            size="xs"
            type="outlineGray"
            onClick={onClickInfoModal}
            circle={true}
          >
            <FaRegTrashAlt />
          </Button>
          <Button
            size="xs"
            type="outlineGray"
            circle={true}
            onClick={handleEdit}
          >
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
      </div>
      <div>
        <FaFlag
          className={`${
            category === "High Priority" ? "text-red-500" : "text-yellow-400"
          } text-xl`}
        />
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
