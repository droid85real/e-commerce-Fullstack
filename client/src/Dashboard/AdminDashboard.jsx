import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  BarChart3,
  Settings,
  LogOut,
  Trash2,
  Menu,
  X,
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: "",
    description: "",
    category: "",
  });

  // ✅ Fetch products
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/api/products");
        const newResult = await response.json();
        setProduct(newResult);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProduct();
  }, []);

  // ✅ Delete Product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProduct((prev) => prev.filter((item) => item._id !== id));
        alert("Product deleted successfully!");
      } else {
        alert("Failed to delete product. Please try again.");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Error deleting product.");
    }
  };

  // ✅ Handle Form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.imageUrl) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newProduct = await response.json();
        setProduct((prev) => [...prev, newProduct]);
        alert("✅ Product added successfully!");
        setFormData({
          name: "",
          price: "",
          imageUrl: "",
          description: "",
          category: "",
        });
        setActiveTab("Products");
      } else alert("❌ Failed to add product.");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Error adding product.");
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Products", icon: <Package size={20} /> },
    { name: "Add Product", icon: <PlusCircle size={20} /> },
    { name: "Analytics", icon: <BarChart3 size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 font-[Inter]">
      {/* Sidebar Toggle (Mobile) */}
      <div className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow">
        <h1 className="text-xl font-bold text-blue-700">Admin Panel</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-700"
        >
          {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-30 top-0 left-0 h-full md:h-auto w-64 bg-white shadow-md flex flex-col justify-between border-r border-gray-200 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          <div className="hidden md:block p-6 text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-blue-400 text-white text-center rounded-br-3xl">
            Admin Panel
          </div>
          <nav className="mt-6">
            {menuItems.map((item) => (
              <div
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 px-6 py-3 cursor-pointer rounded-md mx-3 mb-1 transition-all ${
                  activeTab === item.name
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            ))}
          </nav>
        </div>

        <div className="p-5 border-t flex items-center gap-2 text-gray-600 hover:text-red-500 cursor-pointer transition-all">
          <LogOut size={20} />
          <span className="text-sm font-semibold">Logout</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
          {activeTab}
        </h1>

        {/* ✅ Dashboard Section */}
        {activeTab === "Dashboard" && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
              {[ 
                { title: "Total Sales", value: "$12,540" },
                { title: "Orders", value: "324" },
                { title: "Products", value: "58" },
                { title: "Earnings", value: "$3,480" },
              ].map((stat) => (
                <div
                  key={stat.title}
                  className="bg-white p-4 md:p-6 rounded-xl shadow hover:shadow-lg transition"
                >
                  <h2 className="text-gray-500 text-sm">{stat.title}</h2>
                  <p className="text-xl md:text-2xl font-bold mt-1 text-gray-800">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-md overflow-x-auto">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Recent Orders
              </h2>
              <table className="min-w-[600px] w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-600">
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[ 
                    { id: "ORD123", customer: "John Doe", amount: "$220", status: "Delivered" },
                    { id: "ORD124", customer: "Alice", amount: "$150", status: "Pending" },
                    { id: "ORD125", customer: "Michael", amount: "$300", status: "Shipped" },
                  ].map((order) => (
                    <tr key={order.id} className="border-t hover:bg-gray-50">
                      <td className="p-3">{order.id}</td>
                      <td className="p-3">{order.customer}</td>
                      <td className="p-3">{order.amount}</td>
                      <td
                        className={`p-3 font-medium ${
                          order.status === "Delivered"
                            ? "text-green-600"
                            : order.status === "Pending"
                            ? "text-yellow-600"
                            : "text-blue-600"
                        }`}
                      >
                        {order.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ✅ Products Section */}
        {activeTab === "Products" && (
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Product List
            </h2>
            <table className="min-w-[700px] w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600">
                  <th className="p-3">Image</th>
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {product.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-10 h-10 md:w-12 md:h-12 rounded object-cover"
                      />
                    </td>
                    <td className="p-3 text-gray-700 text-sm">{item._id}</td>
                    <td className="p-3 text-gray-700">{item.name}</td>
                    <td className="p-3 text-gray-700">₹{item.price}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex items-center justify-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {product.length === 0 && (
              <p className="text-gray-500 text-center mt-6">
                No products found.
              </p>
            )}
          </div>
        )}

        {/* ✅ Add Product Section */}
        {activeTab === "Add Product" && (
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-md max-w-lg mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 text-center">
              Add New Product
            </h2>
            <form onSubmit={handleAddProduct} className="space-y-5">
              {["name", "price", "imageUrl", "category"].map((field) => (
                <div key={field}>
                  <label className="block mb-1 text-sm font-medium text-gray-700 capitalize">
                    {field === "imageUrl" ? "Image URL" : field}
                  </label>
                  <input
                    type={field === "price" ? "number" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Write short product details"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
              >
                Add Product
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
