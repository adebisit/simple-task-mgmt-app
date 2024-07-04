import React from "react";

//importing files...
import { SEARCH_PLACEHOLDER_TEXT } from "../constants.js";
/*
 * Search: A component that aids user to search for a presaved task
 */
const Search = () => {
  return (
    <>
      <input
        id="search"
        type="text"
        placeholder={SEARCH_PLACEHOLDER_TEXT}
        className="border border-gray-400 rounded-lg p-2 w-full"
      />
    </>
  );
};

export default Search;

