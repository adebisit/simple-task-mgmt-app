import React from "react";

//importing files...
import { HEADER_TEXT } from "../constants";

const Navbar = () => {
  return (
    <h1 className="text-3xl font-bold mb-4 text-gray-500 font-roboto">
      {HEADER_TEXT}
    </h1>
  );
};

export default Navbar;
