import React, { useEffect, useState } from "react";

const Trending = () => {
  const [trendingData, setTrendingData] = useState([]);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const result = await response.json();
        setTrendingData(result);
  
      } catch (error) {
        console.error("Error fetching trending data:", error);
      }
    };

    fetchTrendingData();
    console.log(trendingData)
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Trending</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trendingData.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-3 shadow-md hover:shadow-lg transition duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-contain mb-2"
            />
            <h3 className="text-sm font-semibold">{item.title}</h3>
            <p className="text-gray-600">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
