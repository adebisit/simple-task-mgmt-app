import React, { useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { EditIcon, DeleteIcon } from "./Icon";
import CustomRadioButton from "../components/shared/CustomRadioButton"
import DeleteTaskDialog from "../forms/modal-forms/DeleteTaskDialog";
import { useModal } from "../hooks/useModal";
import { deleteTask } from "../services/taskService";

const TaskCard = ({ task, delTask }) => {
  const [isIconChecked, setIsIconChecked] = useState(false);
  const { modal: DeleteTaskDialogModal, setIsOpen } = useModal({
    title: "Delete A Task",
    contentFn: () => "Are you sure you want to delete this task? This action cannot be undone.",
    primaryBtnTxt: "Delete",
    secondaryBtnTxt: "Cancel",
    loadingComp: "Deleting...",
    onSave: () => delTask(task.id),
    onCancel: () => {},
  });

  const openDeleteTaskDialog = () => {
    setIsOpen(true);
  };

  const handleCheckIconClick = () => {
    // @todo logic to update backend & taskstate -> REQUIRED
    setIsIconChecked(!isIconChecked);
  };

  return (
    <>
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
            <div
              style={{ fontSize: "12px" }}
              className={`font-bold ${new Date(task.dueDate) < new Date() ? "text-red-600" : "text-black-600"}`}
            >
              Due: <Moment toNow>{task.dueDate}</Moment>
            </div>
          </Link>
          </div>
          <div className="flex gap-4">
            <EditIcon />
            <button onClick={openDeleteTaskDialog}>
              <DeleteIcon />
            </button>
          </div>
      </div>
      {DeleteTaskDialogModal}
    </>
  );
};

export default TaskCard;
