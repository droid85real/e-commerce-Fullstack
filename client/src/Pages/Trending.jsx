// import React, { useEffect, useState } from "react";

// const Trending = () => {
//   const [trendingData, setTrendingData] = useState([]);

//   useEffect(() => {
//     const fetchTrendingData = async () => {
//       try {
//         const response = await fetch("https://fakestoreapi.com/products");
//         const result = await response.json();
//         setTrendingData(result);
  
//       } catch (error) {
//         console.error("Error fetching trending data:", error);
//       }
//     };

//     fetchTrendingData();
//     console.log(trendingData)
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Trending</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {trendingData.map((item) => (
//           <div
//             key={item.id}
//             className="border rounded-lg p-3 shadow-md hover:shadow-lg transition duration-300"
//           >
//             <img
//               src={item.image}
//               alt={item.title}
//               className="w-full h-40 object-contain mb-2"
//             />
//             <h3 className="text-sm font-semibold">{item.title}</h3>
//             <p className="text-gray-600">${item.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Trending;
import React from "react";
import { ShoppingCart, Search, User } from "lucide-react";

const Trending = () => {
  const products = [
    {
      id: 1,
      name: "Nike Air Max 270 React",
      price: 280,
      image:
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 2,
      name: "Nike Air Max 270 React",
      price: 280,
      image:
        "https://plus.unsplash.com/premium_photo-1683141440843-53f051bf4095?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    },
  ];

  return (
    <div className="font-[Inter] bg-white text-gray-900">
      {/* Navbar */}
<header className="flex justify-between items-center py-6 px-10 border-b bg-white shadow-sm">
  {/* Left Section: Logo + Nav */}
  <div className="flex items-center space-x-10">
    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight cursor-pointer hover:scale-105 transition-transform duration-300">
      Sneakify
    </h1>

    {/* Navigation */}
    <nav className="hidden md:flex space-x-8 text-gray-600 font-medium">
      <a href="#" className="hover:text-black transition-colors">
        Our Collections
      </a>
      <a href="#" className="hover:text-black transition-colors">
        Trending
      </a>
      <a href="#" className="hover:text-black transition-colors">
        About
      </a>
    </nav>
  </div>

  {/* Right Section: Search + Profile + Cart */}
  <div className="flex items-center space-x-6">
    {/* Search Box */}
    <div className="relative group hidden sm:block">
      <input
        type="text"
        placeholder="Search sneakers..."
        className="border border-gray-300 rounded-full pl-10 pr-4 py-2 text-sm w-48 focus:w-64 transition-all duration-300 outline-none 
                   focus:border-black group-hover:border-black"
      />
      <Search
        size={18}
        className="absolute left-3 top-2.5 text-gray-500 group-hover:text-black transition-colors"
      />
    </div>

    {/* Profile Icon */}
    <button className="p-2 rounded-full hover:bg-gray-100 transition-all">
      <User size={22} className="text-gray-600 hover:text-black transition" />
    </button>

    {/* Cart Button */}
    <button className="flex items-center border px-4 py-2 rounded-full hover:bg-gray-100 transition-all">
      <ShoppingCart size={18} className="mr-2" /> Cart
    </button>
  </div>
</header>


      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764"
          alt="Sneaker"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-start px-20 bg-gradient-to-r from-black/60 via-black/30 to-transparent text-white">
          <h1 className="text-6xl font-extrabold mb-3">SNEAKER</h1>
          <p className="text-3xl font-semibold mb-6">STATE OF MIND</p>
          <p className="max-w-lg mb-6 text-gray-200">
            Discover shoes that blend modern design with lasting comfort — move
            confidently every step, every season.
          </p>
          <button className="bg-white text-black px-6 py-3 font-semibold rounded-full hover:bg-gray-200">
            Shop Now
          </button>
        </div>
      </section>

      {/* Brands */}
      <section className="py-10 text-center">
        <h2 className="uppercase text-sm tracking-widest text-gray-500 mb-4">
          Top Rated Brands
        </h2>
        <div className="flex justify-center space-x-10 font-semibold">
          <button className="hover:text-black text-gray-600">Adidas</button>
          <button className="hover:text-black text-gray-600">Puma</button>
          <button className="hover:text-black text-gray-600">Nike</button>
        </div>
      </section>

      {/* Popular Collections */}
      <section className="px-10 py-10 bg-gray-50">
        <div className="flex justify-between items-center mb-8">
       <h2
  className="text-4xl font-extrabold tracking-tight bg-yellow-500 text-gray-700 bg-clip-text text-transparent 
             font-[Poppins] transition-all duration-500 hover:scale-105 hover:from-pink-500 hover:to-yellow-400 cursor-pointer"
>
  Popular Collections
</h2>

          <a href="#" className="text-gray-700 hover:underline">
            Discover All Products →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-all"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-[500px] h-[400px] object-cover rounded-xl mb-6"
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600 mt-2">${item.price.toFixed(2)}</p>
              <button className="mt-4 flex items-center bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition">
                <ShoppingCart size={18} className="mr-2" /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="px-10 py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Trending Now</h2>
          <a href="#" className="text-gray-700 hover:underline">
            Discover All Products →
          </a>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <img
            src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735"
            alt="Trending 1"
            className="rounded-2xl w-full h-[300px] object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070"
            alt="Trending 2"
            className="rounded-2xl w-full h-[300px] object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default Trending;
