import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import CategorySidebar from "../component/CategorySidebar";
import { ProductContext } from "../Context/ProductContext";
import { data } from "react-router-dom";

const ProductPage = () => {
  const { search } = useContext(ProductContext)
  const [data, setData] = useState([]);

  // const fetchData = async () => {
  //   const token = localStorage.getItem("token");
  //   let headers = {
  //     "Content-Type": "application/json",
  //   };
  //   if (token) {
  //     headers["Authorization"] = `Bearer ${token}`;
  //   }
  //   let response = await fetch('/api/products', {
  //     method: "GET",
  //     headers
  //   });
  //   if (!response.ok) {
  //     throw new Error("Failed to fetch products");
  //   }
  //   let json = await response.json();
  //   return json;
  // };
const fetchData = async () => {
  const token = localStorage.getItem("token");
  let headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] =token
  }

  const response = await fetch("/api/products", { method: "GET", headers });

  if (!response.ok) {
    console.error("Failed to fetch products:", response.status);
    return [];
  }

  const json = await response.json();
  return json;
};

  useEffect(() => {
    (async () => {
      const newData = await fetchData();
      setData(newData);
    })();
  }, []);

  const filterData = data.filter((item) => {
    return item.name.toLowerCase().includes(search)
  })

  function loadMore() {
    setTimeout(() => {
      setData((prev) => [...prev, ...data])
    }, 3000);

  }
  // loadMore();
  console.log(data)


  return (
    <div className="grid grid-cols-1 md:grid-cols-[25%_75%] gap-4">
      {/* Sidebar */}
      <div className="hidden md:block">
        <CategorySidebar />
      </div>

      {/* Product Section */}
      <div>
        <p className="text-black font-bold text-2xl p-5 text-center md:text-left">
          Our Collection
        </p>

        <div className="grid gap-4 p-3 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-3 
                        lg:grid-cols-4">
          {filterData.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              thumbnail={item.imageUrl}
              title={item.name}
              price={item.price}
              rating={item.rating}
              discountPercentage={item.discountPercentage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
