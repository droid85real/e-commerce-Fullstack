import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";

const ProductDetails = () => {
  const { id } = useParams(); // ✅ get id from route
  const { fetchProductById } = useContext(ProductContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await fetchProductById(id); // ✅ now id is defined
      setProduct(data);
    })();
  }, [id, fetchProductById]);

  if (!product) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Product Image */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-[400px] object-cover rounded-xl shadow-md"
        />

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.desc}
          </h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-2xl font-semibold text-green-600 mb-6">
            ₹{product.price}
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              Buy Now
            </button>
            <button className="px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
