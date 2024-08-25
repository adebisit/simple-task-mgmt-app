import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Moment from "react-moment";
import { DeleteIcon, EditIcon } from "./Icon";
import CustomRadioButton from "./shared/CustomRadioButton";

const TaskCard = ({ task }) => {
  const dueDate = moment(task.dueDate);

  return (
    <div className="flex flex-row items-start mt-4 mb-4 w-full items-center">
      <CustomRadioButton />
      <div className="flex-1">
        <Link to={`/task/${task.id}`} className="no-underline">
          <div style={{ fontSize: "20px" }} className="font-bold">
            {task.name}
          </div>
          <div
            style={{ fontSize: "16px" }}
            className="text-gray-600 font-inter"
          >
            {task.description}
          </div>
          <div style={{ fontSize: "12px" }} className="font-bold text-red-600">
            Due: <Moment toNow>{dueDate}</Moment>
          </div>
        </Link>
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
  );
};

export default TaskCard;
