//importing React packages...
import React, { useEffect, useState } from "react";

//importing components...
import Navbar from "../components/Navbar";
import AddTaskButton from "../components/AddTaskButton";
import AddTaskForm from "../forms/modal-forms/AddTaskForm";
import { createTask, getTasks } from "../services/taskService";
import { useModal } from "../hooks/useModal";
import TaskCard from "../components/TaskCard";
import { deleteTask } from "../services/taskService";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("")

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const taskData = await getTasks()
      setTasks(taskData)
      setIsLoading(false)
    }
    fetchData();
  }, []);
  
  console.log(tasks)
  const updTask = async (taskId, updatedData) => {
    setTasks(prev => [
      ...prev.filter(task => task.id !== taskId),
      updatedData
    ])
  }
  const delTask = async (taskId) => {
    await deleteTask(taskId);
    setTasks(prev => prev.filter(task => task.id !== taskId))
  }

  const { modal: AddTaskModal, setIsOpen } = useModal({
    title: "Add New Task",
    contentFn: ({ setParentModalFormData }) => (
      <AddTaskForm setParentModalFormData={setParentModalFormData} initialData={{
        title: "",
        description: "",
        dueDate: "",
        priority: "",
      }} />
    ),
    primaryBtnTxt: "Save",
    secondaryBtnTxt: "Cancel",
    loadingComp: "Saving...",
    onSave: async (formData) => {
      const newTask = await createTask({
        name: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        priority: formData.priority,
      });
      setTasks(prev => [...prev, newTask])
      return newTask
    },
    onCancel: () => {},
    onModalClose: (resp) => {
      const { id } = resp
      if (id) {
        navigate(`/task/${id}`)
      }
    },
    requiresValidation: true,
  });

  const openAddNewTaskModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-16 px-4 sm:px-8 md:px-32 lg:px-64 xl:px-64">
      <Navbar />
      <div className="flex items-center w-full mb-8">
        <div className="flex-grow">
          <input
            id="search"
            type="text"
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.currentTarget.value)}
            placeholder="Search tasks..."
            className="border border-2 border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      </div>
      <div className="text-center">
        <p>
          {tasks.filter(task => task.completedAt !== null).length} of {tasks.length} tasks completed
        </p>
        <button onClick={e => setShowCompletedTasks(prev => !prev)} style={{
          color: "blue",
          textDecoration: "underline",
          fontSize: '12px'
        }}>
          { showCompletedTasks ? 'Hide' : 'Show' } Completed Tasks
        </button>
      </div>
      {
        isLoading ? (
          <div className="loadingMessageContainer">
            <div className="message">Loading...</div>
          </div>
        ) : 
        tasks.filter(task => showCompletedTasks || task.completedAt == null).filter(task =>
          task.name.toLowerCase().includes(searchKeyword.toLowerCase()) || task.description.toLowerCase().includes(searchKeyword.toLowerCase())
        ).map((task) => (
          <TaskCard key={task.id} task={task} setTasks={setTasks} delTask={delTask} updTask={updTask} />
        ))
      }
      <AddTaskButton onClick={openAddNewTaskModal} />
      {AddTaskModal}
    </div>
  );
}
export default HomePage;
