import React from "react";

const AddTaskButton = ({ onClick }) => {
  return (
    <button
      className="fixed bottom-12 right-4 md:right-12 bg-blue-500 lg:right-28 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none items-center justify-center"
      onClick={onClick} // Use the onClick prop
    >
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M25 9.375C25.8629 9.375 26.5625 10.0746 26.5625 10.9375V23.4375H39.0625C39.9254 23.4375 40.625 24.1371 40.625 25C40.625 25.8629 39.9254 26.5625 39.0625 26.5625H26.5625V39.0625C26.5625 39.9254 25.8629 40.625 25 40.625C24.1371 40.625 23.4375 39.9254 23.4375 39.0625V26.5625H10.9375C10.0746 26.5625 9.375 25.8629 9.375 25C9.375 24.1371 10.0746 23.4375 10.9375 23.4375H23.4375V10.9375C23.4375 10.0746 24.1371 9.375 25 9.375Z"
          fill="white"
        />
      </svg>

      {/* <PlusIcon /> */}
    </button>
  );
};

export default AddTaskButton;
