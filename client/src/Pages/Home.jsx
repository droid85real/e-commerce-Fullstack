import Navbar from "../component/Header/Navbar";
import Footer from "../component/Footer";
import ProductPage from "./ProductPage";
import React from "react";
import Corousel from "../component/Corousel";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar (fixed) */}
      <div className="z-10">
           <Navbar />
      </div>

      {/* Corousel */}
     <div className="mt-[103px]">
      <Corousel/>
      </div>

      {/* Main Content */}
      <main className="flex-1 pt-[20px] z-0">
        <ProductPage />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Home;
