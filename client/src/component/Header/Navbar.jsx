// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import Search from './Search'
// import { BsCart3 } from "react-icons/bs";
// import { TbLogin } from "react-icons/tb";
// import Header from './Index';

// const Navbar = () => {
//     const navigate = useNavigate()
//     return (
//         <div>
//             <Header/>
//             <div className="flex w-full  p-2 bg-slate-800 text-[white] font-[verdana] fixed top-[42px] z-10">
//                 <div class="w-[50%] flex items-center relative">
//                     <p>logo</p>
//                     <Search />
//                 </div>
//                 <div className="flex p-2 w-[45%] justify-between cursor-pointer">
//                     <div onClick={() => navigate('/about')}>Category</div>
//                     <div onClick={() => navigate('/contact')}>Trending</div>
//                     <div onClick={() => navigate('/collection')} className='flex'>Your Cart <BsCart3 className='ms-2 items-center' size={20} /></div>
//                     <div onClick={() => navigate('/login')} className='flex'>Login <TbLogin className='ms-2 items-center ' size={20} /></div>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Navbar
import React from "react";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import { BsCart3 } from "react-icons/bs";
import { TbLogin } from "react-icons/tb";
import Header from "./Index";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Top Strip */}
      <Header />

      {/* Navbar */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full p-2 bg-slate-800 text-white font-[verdana] fixed top-[42px] z-10 gap-3">
        <div className="flex items-center gap-4 w-full md:w-1/2">
          <p className="font-bold text-lg cursor-pointer">Logo</p>
          <div className="flex-1">
            <Search />
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-end gap-10 w-full md:w-1/2">
          <div
            onClick={() => navigate("/about")}
            className="hover:text-gray-300 cursor-pointer"
          >
            Category
          </div>
          <div
            onClick={() => navigate("/contact")}
            className="hover:text-gray-300 cursor-pointer"
          >
            Trending
          </div>
          <div
            onClick={() => navigate("/collection")}
            className="flex items-center hover:text-gray-300 cursor-pointer"
          >
            Your Cart <BsCart3 className="ms-2" size={20} />
          </div>
          <div
            onClick={() => navigate("/login")}
            className="flex items-center hover:text-gray-300 cursor-pointer"
          >
            Logout <TbLogin className="ms-2" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
