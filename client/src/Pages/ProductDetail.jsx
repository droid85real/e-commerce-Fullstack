import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";
import { toast } from "sonner";

const token = localStorage.getItem("token");

const ProductDetails = () => {
  const { id } = useParams();
  const { fetchProductById, products } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    })();
  }, [id, fetchProductById]);

  const addToCart = async (e) => {
    e.preventDefault();
    if (!product) return;

    try {
      const res = await fetch("http://localhost:3000/api/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          productId: product._id,
          productName: product.name,
          price: product.price,
          quantity: 1,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`${product.name} added to cart!`);
      } else {
        toast.error(data.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again later.");
    }
  };

  if (!product) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-white py-10 px-6 font-[Inter]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left: Product Image */}
        <div className="flex justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-[380px] h-[420px] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase">
              {product.category || "MEN'S CLOTHING"}
            </p>
            <h1 className="text-3xl font-bold text-gray-800 mt-1">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-yellow-500 text-lg">★</span>
              <span className="text-gray-600 text-sm font-medium">
                {product.rating || "4.1"} / 5
              </span>
            </div>
            <p className="text-2xl font-semibold text-green-700 mt-4">
             ₹ {product.price}
            </p>

            <p className="text-gray-600 mt-4 leading-relaxed">
              {product.desc ||
                "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, lightweight and soft fabric for breathable and comfortable wearing."}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              onClick={addToCart}
              className="px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition font-medium"
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="px-6 py-3 border border-gray-800 text-gray-800 rounded-md hover:bg-gray-800 hover:text-white transition font-medium"
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          You may also like
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {(products && products.length > 0 ? products.slice(0, 4) : []).map(
            (item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="cursor-pointer bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-52 object-cover"
                />
                <div className="p-3 text-center">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-sm">${item.price}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
