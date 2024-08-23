import { useEffect, useState } from "react";
import { HambuggerIcon, BackIcon } from "../Icon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {getTasks } from "../../services/taskService"; // Adjust the import path as needed

export default function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [tasksDueToday, setTasksDueToday] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log(new Date().toISOString());
        const tasks = await getTasks({dueDate: new Date().toISOString()}); // Fetch all tasks
        console.log("Tasks due today: ", tasks);
        setTasksDueToday(tasks);
        
      } catch (err) {
        console.error("Error fetching tasks: ", err);
      }
    };

    fetchTasks();
  }, []);

  if (!location.pathname.startsWith("/task")) {
    return null;
  }

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full transition-transform transform bg-gray-200 ${
        isOpen ? "w-60" : "w-16"
      }`}
    >
      <div className="relative flex items-center justify-between h-16 px-2">
        <button
          onClick={toggleSidebar}
          className={`${
            !isOpen ? "flex items-center justify-center w-full h-full" : "absolute top-2 right-2"
          }`}
        >
          <HambuggerIcon className="text-gray-700" />
        </button>
        {isOpen && (
          <div className="flex items-center">
            <button onClick={handleBackClick} className="mr-2">
              <BackIcon className="text-gray-700 w-6 h-6" />
            </button>
            <span className="text-gray-700 font-bold">Home</span>
          </div>
        )}
      </div>

      {!isOpen && (
        <div className="flex flex-col items-center justify-center mt-2 space-y-4">
          <button
            onClick={handleBackClick}
            className="p-2 rounded-full flex items-center justify-center"
          >
            <BackIcon className="text-gray-700 w-6 h-6" />
          </button>
        </div>
      )}

      {isOpen && (
        <div className="mt-4 flex flex-col items-center space-y-4">
          {tasksDueToday.map((task) => (
            <Link
              to={`/task/${task.id}`}
              key={task.id}
              className="block text-blue-400 underline mb-2 text-center"
              onClick={toggleSidebar} // Close sidebar when a task is selected
            >
              {task.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}