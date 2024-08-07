// src/components/AddTaskForm.jsx
import React, {useState} from "react";

const AddTaskForm = ({ onChange }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    onChange({ title: e.target.value, description, dueDate, priority });
  };
  
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    onChange({ title, description: e.target.value, dueDate, priority });
  };
  
  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
    onChange({ title, description, dueDate: e.target.value, priority });
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
    onChange({ title, description, dueDate, priority: e.target.value });
  };
  return (
    <form>
      <div className="mb-4 pb-2">
        <label className="block text-black text-lg pb-1 mb-2" htmlFor="title">
          Title
        </label>
        <input
          className="border-2 border-gray-400 text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-black text-lg pb-1 mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="border-2 border-gray-400 rounded text-lg w-full py-4 px-3 leading-tight focus:outline-none"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="mb-4 flex pb-12">
        <div className="w-1/2 mr-2">
          <label className="block text-black text-lg mb-2" htmlFor="due-date">
            Due Date
          </label>
          <input
            type="date"
            className="border-2 text-lg border-gray-400 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="due-date"
            value={dueDate}
            onChange={handleDueDateChange}
          />
        </div>
        <div className="w-1/2 ml-2">
          <label className="block text-black text-lg mb-2" htmlFor="priority">
            Priority
          </label>
          <input
            className="border-2 text-lg border-gray-400 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="priority"
            type="text"
            value={priority}
            onChange={handlePriorityChange}
          />
        </div>
      </div>
    </form>
  );
};

export default AddTaskForm;