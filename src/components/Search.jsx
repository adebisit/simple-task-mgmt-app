import React from "react";
import { FilterIcon, SortIcon } from "./Icon.jsx";


const Search = () => {
  return (
    <div className="flex items-center w-full mb-8">
      <div className="flex-grow">
        <input
          id="search"
          type="text"
          placeholder="Search tasks..."
          className="border border-2 border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div className="flex justify-evenly w-auto ml-4 space-x-2">
        <button>
          <FilterIcon />
        </button>
        <button>
          <SortIcon />
        </button>
      </div>
    </div>
  );
};

export default Search;
