// Cart.jsx
import { useState, useEffect } from "react";
import CartCard from "../Pages/CartCard";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkout = () => {
    navigate("/checkout");
  };
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:3000/api/cart", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      setCartData(data.items || data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      await deleteItem(productId);
      return;
    }

    await fetch("http://localhost:3000/api/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ productId, quantity }),
    });

    fetchCart(); // refresh UI
  };

  const deleteItem = async (productId) => {
    await fetch(`http://localhost:3000/api/cart/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    fetchCart();
  };

  const clearCart = async () => {
    await fetch("http://localhost:3000/api/cart/clear", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    fetchCart();
  };

  const totalProducts = cartData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = totalProducts > 0 ? 30 : 0;
  const total = totalProducts + shipping;

  if (loading)
    return <p className="text-center mt-20 text-lg">Loading cart...</p>;

  if (cartData.length === 0)
    return <p className="text-center mt-20 text-lg">Your cart is empty.</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-12">
      <h1 className="text-3xl font-bold text-center mb-8">Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Left - Item List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow border border-gray-200 p-6">
          <div className="mb-4 border-b pb-3">
            <h2 className="text-xl font-semibold">Item List</h2>
          </div>

          <div className="space-y-4">
            {cartData.map((item) => (
              <CartCard
                key={item._id || item.productId}
                item={item}
                onIncrease={() =>
                  updateQuantity(item.productId, item.quantity + 1)
                }
                onDecrease={() =>
                  updateQuantity(item.productId, item.quantity - 1)
                }
                deleteItem={() => deleteItem(item.productId)}
              />
            ))}
          </div>

          <button
            onClick={clearCart}
            className="mt-4 w-full py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition"
          >
            Clear Cart
          </button>
        </div>

        {/* Right - Order Summary */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4 border-b pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <p>Products ({cartData.length})</p>
              <p>₹{totalProducts.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>₹{shipping.toFixed(2)}</p>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-bold">
              <p>Total amount</p>
              <p>₹{total.toFixed(2)}</p>
            </div>
          </div>

          <button
            onClick={checkout}
            className="mt-6 w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Go to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
