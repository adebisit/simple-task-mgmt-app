//importing React packages...
import React from "react";

//importing components...
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import TaskCard from "../components/TaskCard";
import AddTaskButton from "../components/AddTaskButton";
import SeeMoreLink from "../components/SeeMoreLink";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-16 px-4 sm:px-8 md:px-32 lg:px-64 xl:px-64">
      <Navbar />
      <Search />
      <TaskCard />
      <AddTaskButton />
      <SeeMoreLink />
    </div>
  );
}

export default HomePage;
