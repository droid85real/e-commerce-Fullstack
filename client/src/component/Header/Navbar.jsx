import { useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import { BsCart3 } from "react-icons/bs";
import { TbLogin } from "react-icons/tb";
import Header from "./Index";
import { useAuth } from "@/Context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation(); // ✅ Get current route

  return (
    <div className="fixed w-full z-20 flex flex-col shadow-lg text-yellow-400 ">
      {/* Top Strip */}
      {/* <Header /> */}

      {/* Navbar */}
      <div className="flex flex-col md:flex-row items-center justify-between px-2 py-2 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white font-[verdana] w-full gap-4 transition-all duration-300">
        
        {/* Logo & Search */}
        <div className="flex items-center gap-4 w-full md:w-1/2">
        <h1 className="text-3xl font-extrabold">
          <span className="text-white">Apni</span>
          <span className="text-blue-400">Shop</span>
        </h1>


          <div className="flex-1 ml-4 sm:ml-6 lg:ml-8">
            {(location.pathname === "/" || location.pathname === "/home") && <Search />}
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

          <div className="flex items-center relative cursor-pointer group">
            <span className="group-hover:text-blue-400 transition-colors duration-300 flex items-center">
                  {isAuthenticated ? <p onClick={logout}>Logout</p> : <p onClick={()=>navigate("/login")}>Login</p>}
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
