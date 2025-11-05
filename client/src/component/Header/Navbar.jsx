// import logo from "../../assets/Logo.webp";
// import { useNavigate } from "react-router-dom";
// import Search from "./Search";
// import { BsCart3 } from "react-icons/bs";
// import { TbLogin } from "react-icons/tb";
// import Header from "./Index";

// const Navbar = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="fixed w-full z-20 flex flex-col">
//       {/* Top Strip */}
//       <Header />

//       {/* Navbar */}
//       <div className="flex flex-col md:flex-row items-center justify-between p-2 bg-slate-800 text-white font-[verdana] w-full z-10 gap-3">
//         <div className="flex items-center gap-4 w-full md:w-1/2">
//           <p className="font-bold text-lg cursor-pointer"><img src={logo} alt="" srcset="" width={50}/></p>
//           <div className="flex-1">
//             <Search />
//           </div>
//         </div>

//         <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-end gap-10 w-full md:w-1/2">
//           <div
//             onClick={() => navigate("/about")}
//             className="hover:text-gray-300 cursor-pointer"
//           >
//             Category
//           </div>
//           <div
//             onClick={() => navigate("/contact")}
//             className="hover:text-gray-300 cursor-pointer"
//           >
//             Trending
//           </div>
//           <div
//             onClick={() => navigate("/cart")}
//             className="flex items-center hover:text-gray-300 cursor-pointer"
//           >
//             Your Cart <BsCart3 className="ms-2" size={20} />
//           </div>
//           <div
//             onClick={() => navigate("/")}
//             className="flex items-center hover:text-gray-300 cursor-pointer"
//           >
//             Logout <TbLogin className="ms-2" size={20} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import logo from "../../assets/Logo.webp";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import { BsCart3 } from "react-icons/bs";
import { TbLogin } from "react-icons/tb";
import Header from "./Index";
import { setLocalStorage } from "../../Context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="fixed w-full z-20 flex flex-col shadow-lg text-yellow-400 ">
      {/* Top Strip */}
      {/* <Header /> */}

      {/* Navbar */}
      <div className="flex flex-col md:flex-row items-center justify-between px-2 py-1 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white font-[verdana] w-full gap-4 transition-all duration-300">
        
        {/* Logo & Search */}
        <div className="flex items-center gap-4 w-full md:w-1/2">
          {/* <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-md"
            onClick={() => navigate("/")}
          /> */}
 <h1 className="text-3xl font-extrabold">
  <span className="text-white">Apna</span>
  <span className="text-blue-400">Shop</span>
</h1>


          <div className="flex-1">
            <Search />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-end gap-8 w-full md:w-1/2 text-sm sm:text-base">
          <div
            onClick={() => navigate("/home")}
            className="relative cursor-pointer group"
          >
            <span className="group-hover:text-blue-400 transition-colors duration-300">Home</span>
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-blue-400 group-hover:w-full transition-all duration-300"></span>
          </div>

          <div
            onClick={() => navigate("/trending")}
            className="relative cursor-pointer group"
          >
            <span className="group-hover:text-blue-400 transition-colors duration-300">Trending </span>
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-blue-400 group-hover:w-full transition-all duration-300"></span>
          </div>

          <div
            onClick={() => navigate("/cart")}
            className="flex items-center relative cursor-pointer group"
          >
            <span className="group-hover:text-blue-400 transition-colors duration-300 flex items-center">
              Cart <BsCart3 className="ml-2" size={18} />
            </span>
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-blue-400 group-hover:w-full transition-all duration-300"></span>
          </div>

          <div
            onClick={() => navigate("/login")}
            className="flex items-center relative cursor-pointer group"
          >
            <span className="group-hover:text-blue-400 transition-colors duration-300 flex items-center">
                  {token ? <p onClick={()=>localStorage.setItem("token","")}>Logout</p> : <p>Login</p>}
           <TbLogin className="ml-2" size={18} />
            </span>
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-blue-400 group-hover:w-full transition-all duration-300"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
