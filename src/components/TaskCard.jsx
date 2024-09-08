import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { EditIcon, DeleteIcon } from "./Icon";
import CustomRadioButton from "../components/shared/CustomRadioButton"
import { useModal } from "../hooks/useModal";
import AddTaskForm from "../forms/modal-forms/AddTaskForm";
import { updateTask } from "../services/taskService";

const TaskCard = ({ task, delTask, updTask }) => {
  const { modal: DeleteTaskDialogModal, setIsOpen } = useModal({
    title: "Delete A Task",
    contentFn: () => "Are you sure you want to delete this task? This action cannot be undone.",
    primaryBtnTxt: "Delete",
    secondaryBtnTxt: "Cancel",
    loadingComp: "Deleting...",
    onSave: () => delTask(task.id),
    onCancel: () => {},
  });

  const { modal: EditTaskModal, setIsOpen: setEditTaskModalOpen } = useModal({
    title: "Edit New Task",
    contentFn: ({ setParentModalFormData }) => (
      <AddTaskForm setParentModalFormData={setParentModalFormData} initialData={{
        title: task.name,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
      }} />
    ),
    primaryBtnTxt: "Save",
    secondaryBtnTxt: "Cancel",
    loadingComp: "Saving...",
    onSave: async (formData) => {
      const updatedData = await updateTask(task.id, {
        name: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        priority: formData.priority,
      });
      updTask(task.id, updatedData)
    },
    onCancel: () => {},
    requiresValidation: true,
  });

  const openDeleteTaskDialog = () => {
    setIsOpen(true);
  };

  const completeTask = async () => {
    const updatedTask = await updateTask(task.id, {"completedAt": new Date()})
    updTask(task.id, updatedTask)
  }
  
  return (
    <>
      <div className="flex flex-row items-start mt-4 mb-4 w-full items-center">
        <button onClick={completeTask}>
          <CustomRadioButton isChecked={task.completedAt !== null}/>
        </button>
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
              Due: <Moment fromNow>{task.dueDate}</Moment>
            </div>
          </Link>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setEditTaskModalOpen(true)} style={{ cursor: "pointer", padding: "5px" }}>
              <EditIcon />
            </button>
            <button onClick={openDeleteTaskDialog} style={{ cursor: "pointer", padding: "5px" }}>
              <DeleteIcon />
            </button>
          </div>
      </div>
      {EditTaskModal}
      {DeleteTaskDialogModal}
    </>
  );
};

export default TaskCard;
