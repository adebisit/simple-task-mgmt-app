// src/components/AddTaskForm.jsx
import React, { useState } from "react";

const AddTaskForm = ({ initialData, setParentModalFormData }) => {
  const [formData, setFormData] = useState(initialData)
  // const [formData, setFormData] = useState({
  //   title: "",
  //   description: "",
  //   dueDate: "",
  //   priority: 1,
  // });
  
  const inputChange = (e) => {
    const inputName = e.target.name;
    const value = e.target.value;
    if (inputName === "dueDate" && value) {
      const date = new Date(value);
      const isoDateString = date.toISOString();
      //setFormData((prev) => ({ ...prev, [inputName]: isoDateString }));
      setFormData((prev) => ({
        ...prev,
        [inputName]: isoDateString,
      }))
      setParentModalFormData((prev) => ({
        ...prev,
        [inputName]: isoDateString,
      }));
    } else {
      //setFormData((prev) => ({ ...prev, [inputName]: value }));
      setFormData((prev) => ({ ...prev, [inputName]: value }));
      setParentModalFormData((prev) => ({ ...prev, [inputName]: value }));
    }
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
          name="title"
          value={formData.title}
          onChange={inputChange}
          required
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
          type="text"
          name="description"
          value={formData.description}
          onChange={inputChange}
          required
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
            name="dueDate"
            value={formData.dueDate.split('T')[0]}
            onChange={inputChange}
            required
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
            name="priority"
            value={formData.priority}
            onChange={inputChange}
          />
        </div>
      </div>
    </form>
  );
};

export default AddTaskForm;
