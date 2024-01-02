import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="text-gray-800">
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-4xl font-bold leading-normal sm:text-5xl">
            Welcome to <br />
            <span className="text-violet-600 leading-normal">
              {" "}
              Task Manager
            </span>{" "}
            App
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12 font-medium">
            Stay Organized, Accomplish More <br /> Your Tasks, Your Way!
          </p>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <Link
              rel="noopener noreferrer"
              href="/todos"
              className="px-8 py-3 text-lg font-semibold rounded bg-violet-600 text-gray-50"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <img
            src="/task.png"
            alt=""
            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
