import React from "react";

const Profile = () => {
  return (
    <div>
      <div className="flex flex-col justify-center max-w-xs pt-6 px-3 sm:px-12  text-gray-800">
        <img
          src="/zahid-pic.png"
          alt=""
          className="w-32 h-32 mx-auto rounded-full bg-gray-500 aspect-square"
        />
        <div className="space-y-4 text-center divide-y divide-gray-300">
          <div className="my-2 space-y-1 whitespace-nowrap">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Md Zahid Hasan
            </h2>
            <p className="px-5 text-xs sm:text-base text-gray-600">
              Full-stack developer
            </p>
          </div>
          <div className="flex justify-center pt-2 space-x-4 align-center"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
