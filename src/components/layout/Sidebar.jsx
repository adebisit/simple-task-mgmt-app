import { HambuggerIcon, BackIcon } from "../Icon";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ tasksFiltered = [], isOpen, toggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const hasTasks = tasksFiltered.length > 0;

  // Render the sidebar if the current path starts with "/task"
  if (!location.pathname.startsWith("/task")) {
    return null;
  }

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full ${
        hasTasks ? "w-80" : "w-16"
      } bg-gray-200 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-center h-16">
        <button onClick={toggleSidebar}>
          <HambuggerIcon className="text-gray-700" />
        </button>
      </div>
      <div className="mt-2 flex flex-col items-center space-y-4">
        <button
          className="bg-blue-500 p-2 rounded-full"
          onClick={handleBackClick}
        >
          <BackIcon className="text-white w-6 h-6" />
        </button>
        {hasTasks ? (
          tasksFiltered.map((task) => (
            <Link
              to={`/task/${task.id}`}
              key={task.id}
              className="block text-blue-400 underline mb-2 text-center"
              onClick={toggleSidebar} // Close sidebar when a task is selected
            >
              {task.name}
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-600 text-sm mt-2"></p>
        )}
      </div>
    </div>
  );
}
