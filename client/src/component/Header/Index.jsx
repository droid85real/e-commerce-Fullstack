import React from "react";
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useState } from "react";
import "../../index.css"; 

const Header = () => {
  const [value, setValue] = useState("");
  return (
    <header>
      <div className="top-strip py-2 border-t-1 border-b-[1px] border-s-cyan-50 bg-slate-800 text-white flex">
        <div className="flex mx-auto items-center px-4  gap-1">
          <AiFillLinkedin size={25} />
          <AiFillFacebook size={25} />
          <AiFillInstagram size={25} />
          <FaSquareXTwitter size={25} />
        </div>
        <div className="container items-center  m-auto">
          <div className="flex justify-center">
            <div className="col1 flex" >
              <p className="text-[14px] font-medium ">
                Get up to 50% off new season styles, limited time only
              </p>
            </div>
            <div className="col2 flex  space-x-4 cursor-pointer absolute right-10">
              <select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="border rounded bg-transparent text-[15px] ">
                <option value="ENGLISH">ENGLISH</option>
                <option value="HINDI">HINDI</option>
                <option value="FRENCH">FRENCH</option>
              </select>
              <select className="border rounded bg-transparent text-[15px] ">
                <option value="USD">USD</option>
                <option value="EURO">EURO </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
    </header>
  );
};

export default Header;
