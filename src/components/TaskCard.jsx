import React, { useState } from "react";
import moment from "moment";
import Moment from "react-moment";
import "../index";
//importing files...
import { TASK_DESCRIPTION, TASK_TITLE } from "../constants";
import { DeleteIcon, EditIcon } from "./Icon";
import CustomRadioButton from "./shared/CustomRadioButton";

const TaskCard = () => {
  //get date from moment package
  const dueDate = moment().add(5, "days");

  return (
    <>
      <div className="flex flex-row items-start mt-4 mb-4 w-full items-center">
        <CustomRadioButton isIconChecked />
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
          <div style={{ fontSize: "12px" }} className="font-bold text-red-600">
            Due: <Moment toNow>{dueDate}</Moment>
          </div>
        </div>
        <div className="flex gap-4">
          {/*Edit */}
          <button>
            <EditIcon />
          </button>

          {/*Delete */}
          <button>
            <DeleteIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
