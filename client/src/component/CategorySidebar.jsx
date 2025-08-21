import React from "react";
import {
  FaTshirt,
  FaShoePrints,
  FaGem,
  FaSprayCan,
  FaPumpSoap,
  FaGlasses,
  FaShoppingBag,
} from "react-icons/fa";

const categories = [
  { name: "Clothes", icon: <FaTshirt className="text-xl text-green-600" /> },
  { name: "Footwear", icon: <FaShoePrints className="text-xl text-blue-600" /> },
  { name: "Jewelry", icon: <FaGem className="text-xl text-purple-500" /> },
  { name: "Perfume", icon: <FaSprayCan className="text-xl text-pink-500" /> },
  { name: "Cosmetics", icon: <FaPumpSoap className="text-xl text-orange-500" /> },
  { name: "Glasses", icon: <FaGlasses className="text-xl text-gray-700" /> },
  { name: "Bags", icon: <FaShoppingBag className="text-xl text-red-500" /> },
];

export default function CategorySidebar() {
  return (
    <div
      className="
        hidden md:block   
        md:w-64          
        w-full          
        bg-white rounded-2xl shadow p-4
        md:sticky md:top-[120px]
        mb-3
      "
    >
      <h2 className="text-lg font-bold mb-4">CATEGORY</h2>
      <ul className="space-y-3">
        {categories.map((cat, index) => (
          <li
            key={index}
            className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
          >
            <div className="flex items-center gap-3">
              {cat.icon}
              <span className="text-gray-700 font-medium">{cat.name}</span>
            </div>
            {/* Checkbox */}
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
