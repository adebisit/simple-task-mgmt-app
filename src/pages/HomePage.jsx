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
import { deleteTask } from "../services/taskService";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const taskData = await getTasks();
      setTasks(taskData);
      console.log("Value of Tasks Changes")
      setIsLoading(false)
    }
    fetchData();
  }, []);
  
  const delTask = async (taskId) => {
    await deleteTask(taskId);
    setTasks(prev => prev.filter(task => task.id !== taskId))
  }

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
      {
        isLoading ? (
          <div className="loadingMessageContainer">
            <div className="message">Loading...</div>
          </div>
        ) : 
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} setTasks={setTasks} delTask={delTask} />
        ))
      }
      <AddTaskButton onClick={openAddNewTaskModal} />
      <SeeMoreLink />
      {AddTaskModal}
    </div>
  );
}
export default HomePage;
