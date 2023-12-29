// "use client";
// import { Button } from "keep-react";
// import React, { useState } from "react";
// import { FaCheck, FaEdit, FaRegTrashAlt } from "react-icons/fa";
// import ConfirmModal from "./Modal";

// const Task = () => {
//   const time = "Fri Dec 29 2023 22:21:08";
//   const [showInfoModal, setShowInfoModal] = useState(false);

//   const onClickInfoModal = () => {
//     setShowInfoModal(!showInfoModal);
//   };
//   return (
//     <div className="flex gap-4 p-3 rounded-md">
//       <div className="flex gap-1 items-center">
//         <Button
//           size="xs"
//           type="outlineGray"
//           onClick={onClickInfoModal}
//           circle={true}
//         >
//           <FaRegTrashAlt />
//         </Button>
//         <Button size="xs" type="outlineGray" circle={true}>
//           <FaEdit />
//         </Button>
//         <Button size="xs" type="outlineGray" circle={true}>
//           <FaCheck />
//         </Button>
//       </div>
//       <div>
//         <h1 className="text-base font-semibold">
//           Implement the task sadsadsadsa
//         </h1>
//         <p className="text-sm font-light">{time}</p>
//       </div>
//       <ConfirmModal
//         title="Do you want to delete the task?"
//         showInfoModal={showInfoModal}
//         onClickInfoModal={onClickInfoModal}
//       />
//     </div>
//   );
// };

// export default Task;

import { Button } from "keep-react";
import React, { useState } from "react";
import { FaCheck, FaEdit, FaRegTrashAlt } from "react-icons/fa";
import ConfirmModal from "./Modal";
import MyModal from "./Modal";

const Task = () => {
  const time = "Fri Dec 29 2023 22:21:08";
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskText, setTaskText] = useState("Implement the task sadsadsadsa");

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
        <Button size="xs" type="outlineGray" circle={true}>
          <FaCheck />
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
            <h1 className="text-base font-semibold">{taskText}</h1>
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
