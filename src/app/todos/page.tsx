/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button, Label, TextInput } from "keep-react";

import React, { useEffect, useState } from "react";
import TaskStatusButton from "../components/TaskStatusButton";
import Task from "../components/Task";
import MyModal from "../components/Modal";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { FormData } from "./interfaces";

const page: React.FC = () => {
  const [activeStatus, setActiveStatus] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // set the url for filtering
  let baseUrl =
    "https://658fbf59cbf74b575eca1a39.mockapi.io/api/tasks/alltasks";
  let queryParams = "?isDeleted=false";

  if (selectedCategory) {
    queryParams += `&category=${selectedCategory}`;
  }

  if (activeStatus === "COMPLETED") {
    queryParams += "&isCompleted=true";
  }
  const url = `${baseUrl}${queryParams}`;

  const {
    isLoading,
    isError,
    refetch,
    data: AllTasks = [],
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
  console.log(AllTasks);
  const onClickInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };
  const onSubmit = handleSubmit((data) => {
    const payload = {
      ...data,
      isDeleted: false,
      isCompleted: false,
    };
    console.log(payload);
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
          className="relative h-10 rounded-lg p-1 font-semibold bg-indigo-400 cursor-pointer shadow-lg text-white px-2 selectSelected outline-none w-2/3 md:w-1/5"
        >
          <option value="">All Category</option>
          <option value="Refreshment">Refreshment</option>
          <option value="Work">Work</option>
          <option value="Study">Study</option>
          <option value="Family">Family</option>
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
            {Array.isArray(AllTasks) && AllTasks.length > 0 ? (
              AllTasks.map((d: any) => (
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
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <Label htmlFor="#id-11" value="Add a task" />
            <TextInput
              id="#id-11"
              placeholder="type your task"
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
              <option value="Refreshment">Refreshment</option>
              <option value="Work">Work</option>
              <option value="Study">Study</option>
              <option value="Family">Family</option>
            </select>
            {errors.title?.type === "required" && (
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
