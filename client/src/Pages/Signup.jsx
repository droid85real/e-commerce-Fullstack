import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer"); 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      console.log("Response:", res.status, data);

      if (res.status === 201) {
        setSuccess("Account created successfully!");
        setError("");

        // short delay to show success msg then redirect
        setTimeout(() => navigate("/login"), 1000);
      } else if (data.status === "EMAIL_ALREADY_REGISTERED") {
        setError("Email is already registered.");
        setSuccess("");
      } else {
        setError("Something went wrong.");
        setSuccess("");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-400 font-[Poppins]">
      <div className="bg-[#1a1a1a] border border-cyan-400 shadow-2xl rounded-2xl p-10 w-[350px] transform transition-all duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-white text-center mb-4">Create Account ✨</h1>
        <p className="text-gray-400 text-center mb-8 text-sm">Sign up to get started</p>

        <form onSubmit={onSubmit} className="flex flex-col space-y-5">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter your name" className="h-12 text-white w-full outline-none bg-transparent border border-gray-600 rounded-xl px-5 placeholder:text-gray-400 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 transition duration-300" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" className="h-12 text-white w-full outline-none bg-transparent border border-gray-600 rounded-xl px-5 placeholder:text-gray-400 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 transition duration-300" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter password" className="h-12 text-white w-full outline-none bg-transparent border border-gray-600 rounded-xl px-5 placeholder:text-gray-400 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 transition duration-300" />
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Confirm password" className="h-12 text-white w-full outline-none bg-transparent border border-gray-600 rounded-xl px-5 placeholder:text-gray-400 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 transition duration-300" />

          <select value={role} onChange={(e) => setRole(e.target.value)} className="h-12 text-white w-full outline-none bg-transparent border border-gray-600 rounded-xl px-5 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 transition duration-300 bg-[#1a1a1a]">
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>

          {error && <p className="text-red-400 text-sm">{error}</p>}
          {success && <p className="text-green-400 text-sm">{success}</p>}

          <button type="submit" className="h-12 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl px-5 w-full transition duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50">Sign Up</button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 hover:underline transition duration-300">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
