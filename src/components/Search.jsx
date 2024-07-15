//importing react packages...
import React from "react";

//importing files...
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
        {/* Filter  */}
        <button>
          <svg
            width="35"
            height="35"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="35" height="35" rx="10" fill="#D9D9D9" />
            <path
              d="M25 11H10L16 18.095V23L19 24.5V18.095L25 11Z"
              stroke="#101828"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        {/* Sort */}
        <button>
          <svg
            width="35"
            height="35"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="35" height="35" rx="10" fill="#D9D9D9" />
            <path
              d="M13 17.8333L18 22L23 17.8333M13 12L18 16.1667L23 12"
              stroke="#101828"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        {/* <FilterIcon /> */}
        {/* <SortIcon /> */}
      </div>
    </div>
  );
};

export default Search;
