//importing React packages...
import React from "react";

//importing components...
import Search from "../components/Search";
import TaskCard from "../components/TaskCard";
import AddTaskButton from "../components/AddTaskButton";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-16 px-4 sm:px-8 md:px-32 lg:px-64 xl:px-64">
      <h1 className="text-3xl mb-4 text-gray-500">Task Manager</h1>
      <Search />
      <TaskCard/>
      <div>
        <button className="text-blue-500 underline font-bold">
          <span>See More...</span>
        </button>
      </div>
      <AddTaskButton />
    </div>
  );
}

export default HomePage;
