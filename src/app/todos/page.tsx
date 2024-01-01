/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button, Label, TextInput } from "keep-react";

import React, { useEffect, useState } from "react";
import TaskStatusButton from "../components/TaskStatusButton";
import Task from "../components/Task";
import MyModal from "../components/Modal";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import Loader from "../components/Loader";
import { FormData } from "./interfaces";
import toast from "react-hot-toast";

const page: React.FC = () => {
  const [activeStatus, setActiveStatus] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // set the url for filtering
  let url =
    "https://658fbf59cbf74b575eca1a39.mockapi.io/api/tasks/alltasks?isDeleted=false";

  if (selectedCategory) {
    url += `&category=${selectedCategory}`;
  }

  if (activeStatus === "COMPLETED") {
    url += "&isCompleted=true";
  } else if (activeStatus === "ACTIVE") {
    url += "&isCompleted=false";
  }

  const {
    isLoading,
    isError,
    refetch,
    data: allTasks,
    error,
  } = useQuery({
    queryKey: ["/tasks/alltasks"],
    queryFn: async () => {
      try {
        const response = await fetch(url);
        setLoading(false);
        return response.json();
      } catch (error: any) {
        throw new Error(error);
      }
    },
  });

  //post a task
  const { mutateAsync: addTask } = useMutation({
    mutationFn: async (data: object) => {
      const res = await fetch(
        `https://658fbf59cbf74b575eca1a39.mockapi.io/api/tasks/alltasks`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      return res.json();
    },
  });

  const onClickInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  const onNewTaskSubmit = handleSubmit(async (data) => {
    const payload = {
      ...data,
      isDeleted: false,
      isCompleted: false,
    };
    const result = await addTask(payload);
    if (result) {
      toast.success("Task Added Successfully!");
      refetch();
      reset();
      setShowInfoModal(!showInfoModal);
    } else {
      toast.error("Something Wrong");
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  useEffect(() => {
    refetch();
  }, [activeStatus, selectedCategory]);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    console.log(error);
  }
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <select
          value={selectedCategory}
          onChange={handleChange}
          className="relative h-10 rounded-lg p-1 font-semibold border-2 border-indigo-400 cursor-pointer shadow-sm text-gray-600 px-2 selectSelected outline-none w-2/3 md:w-1/5"
        >
          <option value="">All Category</option>
          <option value="High Priority">High Priority</option>
          <option value="Medium Priority">Medium Priority</option>
          <option value="Low Priority">Low Priority</option>
        </select>
        <TaskStatusButton
          setActiveStatus={setActiveStatus}
          activeStatus={activeStatus}
        />
      </div>
      <div className="my-10 space-y-1 max-h-[60vh] overflow-y-auto">
        {loading ? (
          <Loader />
        ) : (
          <>
            {Array.isArray(allTasks) && allTasks.length > 0 ? (
              allTasks.map((d: any) => (
                <Task key={d.id} data={d} refetch={refetch} />
              ))
            ) : (
              <p>No tasks found</p>
            )}
          </>
        )}
      </div>

      <Button size="md" className="mx-auto" onClick={onClickInfoModal}>
        NEW TASK
      </Button>
      <MyModal
        onClickInfoModal={onClickInfoModal}
        showInfoModal={showInfoModal}
      >
        <form onSubmit={onNewTaskSubmit}>
          <div className="mb-4">
            <Label htmlFor="#id-11" value="Add a task" />
            <TextInput
              id="#id-11"
              placeholder="Type your task"
              color="gray"
              helperText="Info should be short and clear."
              {...register("title", { required: true })}
            />
            {errors.title?.type === "required" && (
              <p className="text-red-500 text-sm" role="alert">
                Task title is required
              </p>
            )}
          </div>
          <div className="w-full">
            <h2 className="text-xs mb-1 font-semibold">Select Category</h2>
            <select
              className="relative h-10 rounded-md p-1 font-normal cursor-pointer px-2 selectSelected outline-none border border-gray-300 w-full"
              {...register("category", { required: true })}
            >
              <option value="">Select Category</option>
              <option value="High Priority">High Priority</option>
              <option value="Medium Priority">Medium Priority</option>
              <option value="Low Priority">Low Priority</option>
            </select>
            {errors.category?.type === "required" && (
              <p className="text-red-500 text-sm" role="alert">
                Task Category is required
              </p>
            )}
          </div>
          <div className=" flex justify-center gap-4 pt-6">
            <Button type="outlineGray" size="xs" onClick={onClickInfoModal}>
              Cancel
            </Button>
            <button
              type="submit"
              className="px-3 py-1 bg-indigo-500 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </MyModal>
    </div>
  );
};

export default page;
