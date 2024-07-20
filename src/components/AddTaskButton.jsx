//importing react packages...
import React from "react";

//importing files...
import { PlusIcon } from "./Icon";

const AddTaskButton = ({onClick}) => {
  return (
    <button
      className="fixed bottom-12 right-4 md:right-12 bg-blue-500 lg:right-28 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none items-center justify-center"
      onClick={onClick} // Use the onClick prop
    >
      <PlusIcon />
    </button>
  );
};

export default AddTaskButton;
