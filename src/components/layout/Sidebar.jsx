import { useEffect, useState } from "react";
import { HambuggerIcon, BackIcon } from "../Icon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getTasks } from "../../services/taskService"; // Adjust the import path as needed

export default function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [tasksDueToday, setTasksDueToday] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks({dueDate: new Date().toISOString()});
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
      className={`fixed top-0 left-0 h-full bg-gray-200 transition-width duration-300 ${
        isOpen ? "w-60" : "w-16"
      }`}
    >
      <div className="relative flex flex-col items-center h-full py-4">
        {/* Toggle Sidebar button */}
        <button
          onClick={toggleSidebar}
          className={`mb-4 ${
            isOpen
              ? "absolute top-2 right-2"
              : "w-full flex items-center justify-center"
          }`}
        >
          <HambuggerIcon className="text-gray-700" />
        </button>

        {/* Back button with Home text */}
        <button
          onClick={handleBackClick}
          className={`flex items-center p-2 rounded-full ${
            isOpen ? "absolute top-10 left-4" : "justify-center"
          }`}
        >
          <BackIcon className="text-gray-700 w-6 h-6" />
          {isOpen && <span className="ml-2 text-sky-500 font-bold">Home</span>}
        </button>

        {/* Links to tasks (only shown when sidebar is open) */}
        {isOpen && (
          <div className="mt-36 flex flex-col items-center space-y-4 w-full">
            {tasksDueToday.map((task) => (
              <Link
                to={`/task/${task.id}`}
                key={task.id}
                className="block text-blue-400 underline text-center w-full"
                onClick={toggleSidebar}
              >
                {task.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}