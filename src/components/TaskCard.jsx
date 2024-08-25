import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Moment from "react-moment";

import { TASK_DESCRIPTION, TASK_TITLE } from "../constants";
import { EditIcon, DeleteIcon, CustomRadioButton } from "./Icon";
import DeleteTaskDialog from "../forms/modal-forms/DeleteTaskDialog";
import { useModal } from "../hooks/useModal";
import { deleteTask } from "../services/taskService";

const TaskCard = ({ task }) => {
  const [isIconChecked, setIsIconChecked] = useState(false);

  const { modal: DeleteTaskDialogModal, setIsOpen } = useModal({
    title: "Delete A Task",
    contentFn: () => <DeleteTaskDialog />,
    primaryBtnTxt: "Delete",
    secondaryBtnTxt: "Cancel",
    loadingComp: "Deleting...",
    onSave: async () => {
      await deleteTask("4e9f20d9-ba4d-4170-a241-9ada2ec2f83e");
    },
    onCancel: () => {},
  });

  const openDeleteTaskDialog = () => {
    setIsOpen(true);
  };

  const handleCheckIconClick = () => {
    setIsIconChecked(!isIconChecked);
  };

  //get date from moment package
  //const dueDate = moment().add(5, "days");

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
            <div style={{ fontSize: "12px" }} className="font-bold text-red-600">
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
