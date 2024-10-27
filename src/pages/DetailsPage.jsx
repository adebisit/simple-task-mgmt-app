import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTask } from "../services/taskService";
import { OptionIcon, PlusIcon } from "../components/Icon";
import Sidebar from "../components/layout/Sidebar";

function DetailsPage({ tasksFiltered }) {
  const { id: taskId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedTask = await getTask(taskId);
        setTask(fetchedTask);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar
        tasksFiltered={tasksFiltered}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div
        className={`flex-1 p-4 transition-all duration-300 ${
          isSidebarOpen ? "ml-60" : "ml-16"
        }`}
        style={{
          minWidth: isSidebarOpen ? `calc(100% - 15rem)` : `calc(100% - 4rem)`,
        }}
      >
        {!task ? <p>Task not found.</p> : (
          <>
            <div className="border-b-2 border-b-black flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-sky-500">{task.name}</h1>

                <p className="text-red-500 mt-2 mb-4">
                  Due Date: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <button className="text-white bg-green-500 rounded-md w-[170px] h-[50px] hover:bg-sky-600">
                  Mark as Completed
                </button>

                <button className="border border-gray-500 rounded-md m-4 p-2">
                  <OptionIcon />
                </button>
              </div>
            </div>

            <div className="flex justify-start items-start mt-4 space-x-4 p-4">
              <div className="flex-1">
                <p>{task.description}</p>
                {/* <Notes /> */}
              </div>
            </div>

            <div>
              <button
                className="fixed bottom-12 right-4 md:right-12 bg-blue-500 lg:right-28 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none items-center justify-center"
              >
                <PlusIcon />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DetailsPage;
