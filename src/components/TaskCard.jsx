import React, { useState } from "react";
import moment from "moment";
import Moment from "react-moment";

//importing files...
import { TASK_DESCRIPTION, TASK_TITLE } from "../constants";
import { EditIcon, DeleteIcon, CustomRadioButton } from "./Icon";

const TaskCard = () => {
  const [isIconChecked, setIsIconChecked] = useState(false);

  const handleCheckIconClick = () => {
    setIsIconChecked(!isIconChecked);
  };

  //get date from moment package
  const dueDate = moment().add(5, "days");

  return (
    <>
      <div className="flex flex-row items-start mt-4 mb-4 w-full items-center">
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
          <div style={{ fontSize: "20px" }} className="font-bold">
            {TASK_TITLE}
          </div>
          <div
            style={{ fontSize: "16px" }}
            className="text-gray-600 font-inter"
          >
            {TASK_DESCRIPTION}
          </div>
          <div
            style={{ fontSize: "12px" }}
            className="font-bold text-red-600"
          >
            Due: <Moment toNow>{dueDate}</Moment>
          </div>
        </div>
        <div className="flex gap-4">
          <EditIcon />
          <DeleteIcon />
        </div>
      </div>
    </>
  );
};

export default TaskCard;