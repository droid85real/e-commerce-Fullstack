import {RiDeleteBinLine} from "react-icons/ri";

const CartCard = ({ item, onIncrease, onDecrease ,deleteItem}) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
      {/* Product Info */}
      <div>
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <p className="text-sm text-gray-500">ID: {item.productId}</p>
        <p className="text-base font-medium text-gray-700">₹{item.price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onDecrease}
          className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          -
        </button>
        <span className="text-lg font-medium">{item.quantity}</span>
        <button
          onClick={onIncrease}
          className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          +
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={deleteItem} className="text-red-500 hover:text-red-700 transition"><RiDeleteBinLine size={20} /></button>
      </div>

      {/* Subtotal */}
      <p className="text-lg font-semibold text-gray-800">
        ₹{(item.price * item.quantity).toLocaleString()}
      </p>
    </div>
  );
};

export default CartCard;