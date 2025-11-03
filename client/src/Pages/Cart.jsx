// import React, { useState, useEffect } from "react";
// import CartCard from "../Pages/CartCard";

// const Cart = () => {
//   const [cartData, setCartData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     fetch("http://localhost:3000/api/cart", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//     })
//       .then((response) => response.json())
//       .then((json) => {
//         setCartData(json.items || json); // Adjust based on your API response
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });
//   }, []);

//   const increaseQuantity = (index) => {
//     const updated = [...cartData];
//     updated[index].quantity += 1;
//     setCartData(updated);
//   };

//   const decreaseQuantity = (index) => {
//     const updated = [...cartData];
//     if (updated[index].quantity > 1) updated[index].quantity -= 1;
//     setCartData(updated);
//   };

//   const total = cartData.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   if (loading) {
//     return <p className="text-center mt-20 text-lg">Loading cart...</p>;
//   }

//   if (cartData.length === 0) {
//     return <p className="text-center mt-20 text-lg">Your cart is empty.</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">
//         <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

//         <div className="space-y-4">
//           {cartData.map((item, index) => (
//             <CartCard
//               key={item.productId}
//               item={item}
//               onIncrease={() => increaseQuantity(index)}
//               onDecrease={() => decreaseQuantity(index)}
//             />
//           ))}
//         </div>

//         {/* Total */}
//         <div className="flex justify-between items-center mt-6 border-t pt-4 text-xl font-bold">
//           <p>Total</p>
//           <p>₹{total.toLocaleString()}</p>
//         </div>

//         <button className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
//           Proceed to Checkout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cart;
import React, { useState, useEffect } from "react";
import CartCard from "../Pages/CartCard";
import { useNavigate } from "react-router-dom";




const Cart = () => {

   const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkout=()=>{
    navigate('/checkout');
  }

  useEffect(() => {
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
    fetchCart();
  }, []);

  const increaseQuantity = (index) => {
    const updated = [...cartData];
    updated[index].quantity += 1;
    setCartData(updated);
  };

  const decreaseQuantity = (index) => {
    const updated = [...cartData];
    if (updated[index].quantity > 1) updated[index].quantity -= 1;
    setCartData(updated);
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
          <h2 className="text-xl font-semibold mb-4 border-b pb-3">Item List</h2>

          <div className="space-y-4">
            {cartData.map((item, index) => (
              <CartCard
                key={item._id || item.productId}
                item={item}
                onIncrease={() => increaseQuantity(index)}
                onDecrease={() => decreaseQuantity(index)}
              />
            ))}
          </div>
        </div>

        {/* Right - Order Summary */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4 border-b pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <p>Products ({cartData.length})</p>
              <p>${totalProducts.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>${shipping.toFixed(2)}</p>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-bold">
              <p>Total amount</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>

          <button onClick={checkout}

          className="mt-6 w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition">
            Go to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
