import React, { useContext } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Button from "@mui/material/Button";
import { MdAddShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";

const ProductCard = ({ id, thumbnail, title, price, rating, discountPercentage }) => {
  const { fetchProductById} = useContext(ProductContext);
  const navigate = useNavigate();

  const handleClick = async () => {
    const product = await fetchProductById(id);
    navigate(`/product/${id}`, { state: { product } });
  };
  const filledStars = Math.round(rating || 3); // default 3 if not provided
  const totalStars = 5;



  return (
    <div
      className="border rounded-xl p-4 shadow-md hover:shadow-lg transition cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-lg font-bold mt-2 truncate">{title}</h2>

      <div className="flex items-center mt-2">
        {Array.from({ length: totalStars }, (_, i) =>
          i < filledStars ? (
            <AiFillStar key={i} className="text-yellow-500" />
          ) : (
            <AiOutlineStar key={i} className="text-gray-400" />
          )
        )}
        <span className="ml-2 text-sm text-gray-500">({rating || 3})</span>
      </div>

      <p className="text-gray-600 font-bold">₹{price}</p>
      <p className="text-sm text-green-600">Discount: {discountPercentage}%</p>

      <Button
        variant="contained"
        size="small"
        startIcon={<MdAddShoppingCart />}
      >
        More details
      </Button>
    </div>
  );
};

export default ProductCard;
