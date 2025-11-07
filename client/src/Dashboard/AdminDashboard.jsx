import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
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
import { useAuth } from "@/Context/AuthContext";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [product, setProduct] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: "",
    imageUrl: "",
    category: "",
    sizes: "",
    rating: "",
    discountPercentage: "",
  });
    const { isAuthenticated, logout } = useAuth();

  const categories = [
    "Electronics",
    "Clothing",
    "Footwear",
    "Accessories",
    "Home & Kitchen",
    "Beauty & Personal Care",
    "Sports & Fitness",
    "Toys & Games"];

  // 🌙 Apply theme mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

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
  }, [product]);


  const navigate=useNavigate();
  // ✅ Delete Product
  async function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Product deleted successfully");
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error(data.message || "Failed to delete product");
      }
    } catch (error) {
      toast.error("Server error while deleting");
    }
  }


  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleAdd = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      sizes: formData.sizes.split(",").map((s) => s.trim()),
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success(data.message);
      setProducts((prev) => [...prev, data.product]);
      setFormData({
        name: "",
        desc: "",
        price: "",
        imageUrl: "",
        category: "",
        sizes: "",
        rating: "",
        discountPercentage: "",
      });
    } else {
      toast.error(data.message);
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
    <div className="flex flex-col md:flex-row h-screen font-[Inter] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-500">
      {/* Sidebar Toggle (Mobile) */}
      <div className="md:hidden flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 shadow">
        <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-700 dark:text-gray-200">
          {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-30 top-0 left-0 h-full md:h-auto w-64 bg-white dark:bg-gray-800 shadow-xl flex flex-col justify-between border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <div>
          <div className="hidden md:block p-6 text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-blue-500 text-white text-center rounded-br-3xl">
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
                className={`flex items-center gap-3 px-6 py-3 cursor-pointer rounded-md mx-3 mb-1 transition-all ${activeTab === item.name
                  ? "bg-blue-600 text-white shadow-lg scale-[1.02]"
                  : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:scale-[1.02]"
                  }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            ))}
          </nav>
        </div>

        <div className="p-5 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-red-500 cursor-pointer transition-all">
          <LogOut size={20} />
          <button
                onClick={() => {
                if (isAuthenticated) logout();
                else navigate("/login");
              }}
          className="text-sm font-semibold">Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto transition-all duration-500">

        {/* ✅ Dashboard */}
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
                  className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow hover:shadow-lg hover:scale-[1.03] transition-transform duration-300"
                >
                  <h2 className="text-gray-500 dark:text-gray-400 text-sm">{stat.title}</h2>
                  <p className="text-xl md:text-2xl font-bold mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-md overflow-x-auto">
              <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
              <table className="min-w-[600px] w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300">
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
                    <tr key={order.id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <td className="p-3">{order.id}</td>
                      <td className="p-3">{order.customer}</td>
                      <td className="p-3">{order.amount}</td>
                      <td
                        className={`p-3 font-medium ${order.status === "Delivered"
                          ? "text-green-600"
                          : order.status === "Pending"
                            ? "text-yellow-500"
                            : "text-blue-500"
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

        {/* ✅ Products */}
        {activeTab === "Products" && (
          <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-md overflow-x-auto transition-all">
            <h2 className="text-lg font-semibold mb-4">Product List</h2>
            <table className="min-w-[700px] w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300">
                  <th className="p-3">Image</th>
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {product.map((item) => (
                  <tr key={item._id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="p-3">
                      <img src={item.imageUrl} alt={item.name} className="w-10 h-10 md:w-12 md:h-12 rounded object-cover" />
                    </td>
                    <td className="p-3 text-sm">{item._id}</td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">₹{item.price}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex items-center justify-center gap-2 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md transition text-sm hover:scale-[1.05]"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {product.length === 0 && <p className="text-gray-500 dark:text-gray-400 text-center mt-6">No products found.</p>}
          </div>
        )}

        {/* ✅ Add Product */}
        {activeTab === "Add Product" && (
          <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-md max-w-lg mx-auto hover:shadow-lg transition-all duration-500">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">Add New Product</h2>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-xl">
              <input type="text" placeholder="Product Name" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />

              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="border p-2 rounded-lg"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <input type="number" placeholder="Price" value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />

              <input type="text" placeholder="Image URL" value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} required />

              <input type="text" placeholder="Sizes (comma separated)" value={formData.sizes}
                onChange={(e) => setFormData({ ...formData, sizes: e.target.value })} />

              <input type="number" placeholder="Rating" value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })} />

              <input type="number" placeholder="Discount %" value={formData.discountPercentage}
                onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })} />

              <textarea placeholder="Description" value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })} className="col-span-full" />

              <button type="submit" className="col-span-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                Add Product
              </button>
            </form>

          </div>
        )}

        {activeTab === "Settings" && (
          <div className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 md:p-10 rounded-2xl shadow-2xl max-w-3xl mx-auto space-y-10 transition-all duration-500">
            {/* ✨ Floating Glow Animation */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 blur-3xl pointer-events-none"></div>

            {/* Profile Settings */}
            <section className="relative z-10 group">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2 transition-all">
                <Settings className="text-blue-600 group-hover:rotate-90 transition-transform duration-300" size={20} />
                Profile Settings
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Profile updated successfully!");
                }}
                className="space-y-4 bg-white/60 dark:bg-gray-800/40 backdrop-blur-xl p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Admin Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Admin User"
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="admin@example.com"
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="relative bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg overflow-hidden group transition-all"
                >
                  <span className="relative z-10">💾 Save Changes</span>
                  <span className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 blur-lg transition"></span>
                </button>
              </form>
            </section>

            <hr className="border-gray-300 dark:border-gray-700" />

            {/* Password Settings */}
            <section className="relative z-10 group">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <span className="group-hover:scale-110 transition-transform duration-300">🔒</span>
                Change Password
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Password changed successfully!");
                }}
                className="space-y-4 bg-white/60 dark:bg-gray-800/40 backdrop-blur-xl p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-green-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-green-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-green-500 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-lg transition-all hover:shadow-md hover:shadow-green-400/30"
                >
                  ✅ Update Password
                </button>
              </form>
            </section>

            <hr className="border-gray-300 dark:border-gray-700" />

            {/* Theme Settings */}
            <section className="relative z-10">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                🎨 Theme Preferences
              </h2>
              <div className="flex items-center justify-between bg-white/60 dark:bg-gray-800/40 backdrop-blur-xl p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
                <span className="text-gray-800 dark:text-gray-100 font-medium">Dark Mode</span>
                <label className="relative inline-flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={(e) => {
                      if (e.target.checked) {
                        document.documentElement.classList.add("dark");
                      } else {
                        document.documentElement.classList.remove("dark");
                      }
                    }}
                  />
                  <div className="w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full peer peer-checked:bg-blue-600 transition-all relative overflow-hidden before:absolute before:content-['🌙'] before:left-1 before:top-1 before:text-xs before:opacity-0 peer-checked:before:opacity-100 after:content-['☀️'] after:absolute after:right-1 after:top-1 after:text-xs peer-checked:after:opacity-0 after:opacity-100"></div>
                  <div className="absolute w-5 h-5 bg-white rounded-full left-[2px] top-[2px] peer-checked:translate-x-6 transition-all shadow-md"></div>
                </label>
              </div>
            </section>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;
