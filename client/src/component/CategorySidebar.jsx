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
  { name: "Clothing", icon: <FaTshirt className="text-xl text-green-600" /> },
  { name: "Footwear", icon: <FaShoePrints className="text-xl text-blue-600" /> },
  { name: "Jewelry", icon: <FaGem className="text-xl text-purple-500" /> },
  { name: "Perfume", icon: <FaSprayCan className="text-xl text-pink-500" /> },
  { name: "Cosmetics", icon: <FaPumpSoap className="text-xl text-orange-500" /> },
  { name: "Glasses", icon: <FaGlasses className="text-xl text-gray-700" /> },
  { name: "Bags", icon: <FaShoppingBag className="text-xl text-red-500" /> },
];

export default function CategorySidebar({ selectedCategories, setSelectedCategories, minPrice, setMinPrice, maxPrice, setMaxPrice, applyFilters }) {
const toggleCategory = (category) => {
  let updatedCategories;
  if (selectedCategories.includes(category)) {
    updatedCategories = selectedCategories.filter((c) => c !== category);
  } else {
    updatedCategories = [...selectedCategories, category];
  }
  setSelectedCategories(updatedCategories);

  // auto-apply filter
  setTimeout(() => {
    applyFilters(updatedCategories, minPrice, maxPrice);
  }, 0);
};


  return (
    <div className="hidden md:block md:w-64 w-full bg-white rounded-2xl shadow p-6 md:sticky md:top-[80px] mb-3 " >
      <h2 className="text-lg font-bold mb-4">CATEGORY</h2>
      <ul className="space-y-2">
        {categories.map((cat, index) => (
          <li
            key={index}
            className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-1 rounded-lg transition"
          >
            <div className="flex items-center gap-3">
              {cat.icon}
              <span className="text-gray-700 font-medium">{cat.name}</span>
            </div>
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat.name)}
              onChange={() => toggleCategory(cat.name)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </li>
        ))}
      </ul>

      {/* Price Filter */}
      <div className="mt-[5px]">
        <h2 className="text-[18px] font-bold mb-2">PRICE RANGE</h2>
        <div className="flex gap-2 mb-3">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            className="w-1/2 border p-1 rounded"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            className="w-1/2 border p-1 rounded"
          />
        </div>
        <button
          onClick={applyFilters}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-[-6px] "
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
