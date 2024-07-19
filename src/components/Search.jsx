//importing react packages...
import React from "react";

//importing files...
import { FilterIcon, SortIcon } from "./Icon.jsx";
import { SEARCH_PLACEHOLDER_TEXT } from "../constants.js";

const Search = () => {
  return (
    <div className="flex items-center w-full mb-8">
      <div className="flex-grow">
        <input
          id="search"
          type="text"
          placeholder={SEARCH_PLACEHOLDER_TEXT}
          className="border border-2 border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div className="flex justify-evenly w-auto ml-4 space-x-2">
        <FilterIcon />
        <SortIcon />
      </div>
    </div>
  );
};

export default Search;
