import React, { useContext, useState } from "react";
import { LuSearch } from "react-icons/lu";
import Button from "@mui/material/Button";
import { ProductContext } from "../../Context/ProductContext";

const Search = () => {
  const {changeHandler}=useContext(ProductContext)
  return (
    <div className="flex items-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl h-[45px] bg-slate-300 rounded-xl border-2 border-gray-400 px-2 mx-auto">
      <input
        type="text"
        placeholder="Search products..."
        className="flex-grow p-2 bg-transparent focus:outline-none text-sm sm:text-base"
        onChange={(e)=>changeHandler(e)}
      />
  <Button><LuSearch size={30} /></Button>
    </div>
  );
};

export default Search;
