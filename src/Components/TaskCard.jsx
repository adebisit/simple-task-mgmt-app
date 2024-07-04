import React, { useState } from "react";

//importing files...
import { TASK_DESCRIPTION, TASK_TITLE } from "../constants";
import { EditIcon, DeleteIcon, CustomRadioButton } from "./Icon";

const TaskCard = () => {
  const [isIconChecked, setIsIconChecked] = useState(false);

  const handleCheckIconClick = () => {
    setIsIconChecked(!isIconChecked);
  };

  return (
    <>
      <div className="flex flex-row items-start p-4 mt-4 mb-4 w-full items-center">
        <div
          onClick={handleCheckIconClick}
          className={`mr-4 cursor-pointer text-2xl ${
            isIconChecked
              ? "text-gray-500 border-gray-500"
              : "text-gray-500 border-gray-300"
          }`}
        >
          {/*Displays appropriate icon based on isIconChecked State*/}
          <CustomRadioButton isIconChecked={isIconChecked} />
        </div>
        <div className="flex-1">
          <div className="font-bold">{TASK_TITLE.toString()}</div>
          <div className="text-gray-600">{TASK_DESCRIPTION.toString()}</div>
        </div>
        <div className="flex gap-4">
          <EditIcon />
          <DeleteIcon />
        </div>
      </div>
      <a href="#" className="text-blue-500 underline">
        see more...
      </a>
    </>
  );
};

export default TaskCard;
