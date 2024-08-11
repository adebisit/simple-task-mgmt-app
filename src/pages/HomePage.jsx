//importing React packages...
import React, { useEffect, useState } from "react";

//importing components...
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import AddTaskButton from "../components/AddTaskButton";
import AddTaskForm from "../forms/modal-forms/AddTaskForm";
import SeeMoreLink from "../components/SeeMoreLink";
import { createTask, getTasks } from "../services/taskService";
import { useModal } from "../hooks/useModal";
import TaskCard from "../components/TaskCard";

function HomePage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const tasks = await getTasks();
      setTasks(tasks);
    }
    fetchData();
  }, [tasks]);
  const { modal: AddTaskModal, setIsOpen } = useModal({
    title: "Add New Task",
    contentFn: ({ setParentModalFormData }) => (
      <AddTaskForm setParentModalFormData={setParentModalFormData} />
    ),
    primaryBtnTxt: "Save",
    secondaryBtnTxt: "Cancel",
    loadingComp: "Saving...",
    onSave: async (formData) => {
      await createTask({
        name: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        priority: formData.priority,
      });
    },
    onCancel: () => {},
    requiresValidation: true,
  });

  const openAddNewTaskModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-16 px-4 sm:px-8 md:px-32 lg:px-64 xl:px-64">
      <Navbar />
      <Search />
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      <AddTaskButton onClick={openAddNewTaskModal} />
      <SeeMoreLink />
      {AddTaskModal}
    </div>
  );
}
export default HomePage;
