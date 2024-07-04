import React from "react";

//importing files...
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import TaskCard from "../components/TaskCard";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-16 pl-24 pr-24">
      <Navbar />
      <Search />
      <TaskCard />
    </div>
  );
}

export default HomePage;
