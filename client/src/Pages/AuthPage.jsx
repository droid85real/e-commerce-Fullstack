// AuthPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import { API_BASE } from "@/api";
import { toast } from "sonner";

export default function AuthPage() {
  const [active, setActive] = useState(false); // false=login , true=signup
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const { login, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(role === "admin" ? "/admin" : "/home", { replace: true });
    }
  }, [isAuthenticated, role, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleToggle = (value) => {
    setActive(value);
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "customer",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        const userRole = data?.user?.role || data?.role || "customer";
        toast.success("Login successful!");
        login(data?.token, userRole);
        navigate(userRole === "admin" ? "/admin" : "/home", { replace: true });
      } else if (res.status === 401) {
        toast.error("Incorrect password. Try again.");
      } else if (res.status === 404) {
        toast.error("No account found with this email.");
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, role } = form;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (res.status === 201) {
        toast.success("Account created successfully!");
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "customer",
        });
        setTimeout(() => handleToggle(false), 1200); // go back to login
      } else if (data.status === "EMAIL_ALREADY_REGISTERED") {
        toast.error("Email is already registered.");
      } else {
        toast.error("Something went wrong.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false); // FIXED: Added finally block to ensure loading state is reset
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-indigo-100">
      <div
        className={`relative bg-white rounded-2xl shadow-lg overflow-hidden w-[768px] max-w-full min-h-[480px] transition-all duration-700 ${
          active ? "active" : ""
        }`}
      >
        {/* Sign Up Form */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center px-10 transition-all duration-700 ${
            active ? "translate-x-full opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          <form
            className="flex flex-col items-center justify-center w-full"
            onSubmit={handleSignup}
          >
            <h1 className="text-2xl font-bold">Create Account</h1>
            <span className="text-xs text-gray-500 mb-4">
              or use your email for registration
            </span>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Name"
              className="bg-gray-100 mt-2 p-3 rounded-md w-full outline-none focus:ring-2 focus:ring-pink-300 transition duration-300"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="bg-gray-100 mt-3 p-3 rounded-md w-full outline-none focus:ring-2 focus:ring-pink-300 transition duration-300"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="bg-gray-100 mt-3 p-3 rounded-md w-full outline-none focus:ring-2 focus:ring-pink-300 transition duration-300"
            />

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm Password"
              className="bg-gray-100 mt-3 p-3 rounded-md w-full outline-none focus:ring-2 focus:ring-pink-300 transition duration-300"
            />

            <select
              value={form.role}
              name="role"
              onChange={handleChange}
              className="bg-gray-100 mt-3 p-3 rounded-md w-full outline-none focus:ring-2 focus:ring-pink-300 transition duration-300"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className={`bg-pink-500 text-white uppercase mt-6 py-3 px-10 rounded-md w-full hover:bg-pink-600 transition duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center px-10 transition-all duration-700 ${
            active ? "translate-x-full opacity-0 z-10" : "opacity-100 z-20"
          }`}
        >
          <form
            className="flex flex-col items-center justify-center w-full"
            onSubmit={handleLogin}
          >
            <h1 className="text-2xl font-bold">Sign In</h1>
            <span className="text-xs text-gray-500 mb-4">
              or use your email password
            </span>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="bg-gray-100 mt-2 p-3 rounded-md w-full outline-none focus:ring-2 focus:ring-pink-300 transition duration-300"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="bg-gray-100 mt-3 p-3 rounded-md w-full outline-none focus:ring-2 focus:ring-pink-300 transition duration-300"
            />

            <button
              type="submit"
              disabled={loading}
              className={`bg-pink-500 text-white uppercase mt-6 py-3 px-10 rounded-md w-full hover:bg-pink-600 transition duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Toggle Container */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-700 rounded-l-[150px] ${
            active ? "-translate-x-full rounded-r-[150px] rounded-l-sm" : ""
          }`}
        >
          <div
            className={`bg-gradient-to-r from-orange-500 to-pink-500 text-white relative -left-full w-[200%] h-full transition-transform duration-700 ${
              active ? "translate-x-1/2" : "translate-x-0"
            }`}
          >
            <div
              className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-8 text-center top-0 transition-all duration-700 bg-gradient-to-r from-orange-500 to-pink-500 ${
                active ? "translate-x-0" : "-translate-x-[200%]"
              }`}
            >
              <h1 className="text-2xl font-bold">Welcome Back!</h1>
              <p className="text-sm my-4">
                Enter your personal details to use all site features
              </p>
              <button
                onClick={() => handleToggle(false)}
                className="border border-white px-8 py-2 rounded-md uppercase text-sm hover:bg-pink-700 transition duration-300"
              >
                Sign In
              </button>
            </div>

            <div
              className={`absolute right-0 w-1/2 h-full flex flex-col items-center justify-center px-8 text-center top-0 transition-all duration-700 bg-gradient-to-l from-orange-500 to-pink-500 ${
                active ? "translate-x-[200%]" : "translate-x-0"
              }`}
            >
              <h1 className="text-2xl font-bold">Hello, Friend!</h1>
              <p className="text-sm my-4">
                Register with your personal details to use all site features
              </p>
              <button
                onClick={() => handleToggle(true)}
                className="border border-white px-8 py-2 rounded-md uppercase text-sm hover:bg-pink-700 transition duration-300"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}