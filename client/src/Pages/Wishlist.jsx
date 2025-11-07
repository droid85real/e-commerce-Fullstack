// Wishlist.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AiFillHeart } from "react-icons/ai";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // Load wishlist data from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(data);
  }, []);

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item._id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    toast.info("Removed from wishlist ❤️‍🔥");
  };

  // Navigate to product detail
  const viewProduct = (id) => {
    navigate(`/product/${id}`);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 font-[Poppins]">
        <AiFillHeart size={70} className="text-pink-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700">
          Your wishlist is empty 💔
        </h2>
        <p
          onClick={() => navigate("/")}
          className="mt-3 text-blue-600 cursor-pointer hover:underline"
        >
          Continue Shopping
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 px-6 font-[Poppins]">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-all duration-300"
            >
              <div
                onClick={() => viewProduct(item._id)}
                className="cursor-pointer"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-52 object-cover rounded-t-lg"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-medium text-gray-800 truncate">
                    {item.name}
                  </h3>
                  <p className="text-pink-600 font-semibold mt-2">
                    ₹{item.price}
                  </p>
                </div>
              </div>

              <div className="p-3 flex justify-center">
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="px-4 py-2 bg-red-500 text-white text-sm rounded-md shadow hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
