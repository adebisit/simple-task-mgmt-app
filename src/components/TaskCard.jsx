import React, { useState } from "react";
import moment from "moment";
import Moment from "react-moment";
import { EditIcon, DeleteIcon } from "./Icon";

const TaskCard = () => {
  const [isIconChecked, setIsIconChecked] = useState(false);

  const handleCheckIconClick = () => {
    setIsIconChecked(!isIconChecked);
  };

  //get date from moment package
  const dueDate = moment().add(5, "days");

  return (
    <>
      <div className="flex flex-row items-start mt-4 mb-4 w-full ">
        <div
          onClick={handleCheckIconClick}
          className={`mr-4 cursor-pointer text-2xl ${
            isIconChecked
              ? "text-gray-500 border-gray-500"
              : "text-gray-500 border-gray-300"
          }`}
        >
        </div>
        <div className="flex-1">
          <div style={{ fontSize: "20px" }} className="font-bold">
          Task 1
          </div>
          <div
            style={{ fontSize: "16px" }}
            className="text-gray-600 font-inter"
          >
            Short description about task
          </div>
          <div style={{ fontSize: "12px" }} className="font-bold text-red-600">
            Due: <Moment toNow>{dueDate}</Moment>
          </div>
        </div>
        <div className="flex gap-4">
          <button>
            <EditIcon />
          </button>
          <button>
            <DeleteIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
