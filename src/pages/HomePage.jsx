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

const tasks = [
  {
    id: "993211cd-561f-4776-9f57-545886c09284",
    name: "Prepare Lesson Plan",
    description:
      "Create a comprehensive lesson plan for the upcoming semester.",
    dueDate: "2024-07-15T23:59:59.000Z",
    priority: 5,
    createdAt: "2024-06-25T09:00:00.000Z",
    updatedAt: "2024-07-01T10:00:00.000Z",
    completedAt: "2024-06-25T09:00:00.000Z",
  },
  {
    id: "b382c14f-9722-404a-85e2-35882086b6ab",
    name: "Prepare for Harvest",
    description:
      "Get all necessary equipment and logistics ready for the upcoming harvest season.",
    dueDate: "2024-07-05T17:00:00.000Z",
    priority: 5,
    createdAt: "2024-06-20T08:00:00.000Z",
    updatedAt: "2024-07-04T16:30:00.000Z",
    completedAt: "2024-07-04T16:30:00.000Z",
  },
];

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
