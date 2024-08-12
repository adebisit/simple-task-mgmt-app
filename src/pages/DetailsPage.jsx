import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { OptionIcon, PlusIcon } from "../components/Icon";
import CustomRadioButton from "../components/shared/CustomRadioButton";

function DetailsPage({ tasks }) {
  const location = useLocation();
  const task = location.state?.task;
  const [note, setNote] = useState("");

  const handleInputChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.trim()) {
      console.log("Note submitted:", note);
      setNote("");
    }
  };
  const handleClick = () => {
    // Add logic for handling the click event here
  };

  return (
    <div className="p-4">
      {task ? (
        <>
          {/* Flex container for the title, description, and button */}
          <div className="border-b-2 border-b-gray-500 flex justify-between items-center">
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-sky-500">{task.name}</h1>
              <p className="text-red-500 mt-2 mb-4">
                Due Date: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <button className="text-white bg-sky-500 rounded-md w-[170px] h-[50px] hover:bg-sky-600">
                Mark as Completed
              </button>
              <button className="border border-gray-500 rounded-md m-4 p-2">
                <OptionIcon />
              </button>
            </div>
          </div>

          <div className="flex mt-4 gap-4 ">
            <div className="flex-1 ml-6">
              <p className="text-lg ">{task.description}</p>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <h2 className="text-sky-500 font-bold text-2xl">Sub Task</h2>
                <button className="border rounded-md bg-sky-500 ml-4 p-1 ">
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-4">
                <CustomRadioButton />
              </div>
            </div>
          </div>

          {/* Add Note Input Field */}
          <div className="mt-10 ml-6">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label
                htmlFor="note"
                className="mb-2 text-sky-500 font-bold text-2xl"
              >
                Add a Note
              </label>
              <input
                type="text"
                id="note"
                value={note}
                onChange={handleInputChange}
                placeholder="enter text here and press Ctrl + Enter to add...."
                className="w-[660px] h-[100px] border border-gray-300 rounded-lg mb-4"
              />
              <div className="flex ">
                <button
                  type="submit"
                  className="bg-sky-500 text-white rounded-md hover:bg-sky-700 w-[80px] h-[35px] "
                >
                  Add
                </button>
              </div>
            </form>
          </div>

          <div>
            <button
              className="fixed bottom-12 right-4 md:right-12 bg-blue-500 lg:right-28 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none items-center justify-center"
              onClick={handleClick}
            >
              <PlusIcon />
            </button>
          </div>
        </>
      ) : (
        <p>Task not found.</p>
      )}
    </div>
  );
}

export default DetailsPage;
