import React, { useState } from "react";

const Signup = ({ handleSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    handleSignup(email, password);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-400 font-[Poppins]">
      <div className="bg-[#1a1a1a] border border-cyan-400 shadow-2xl rounded-2xl p-10 w-[350px] transform transition-all duration-500 hover:scale-105">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-white text-center mb-4">
          Create Account ✨
        </h1>
        <p className="text-gray-400 text-center mb-8 text-sm">
          Sign up to get started
        </p>

        {/* Form */}
        <form onSubmit={onSubmit} className="flex flex-col space-y-5">
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            value={email}
            placeholder="Enter your email"
            className="text-white w-full outline-none bg-transparent border border-gray-600 rounded-xl px-5 py-3 placeholder:text-gray-400 
                       focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 transition duration-300"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            value={password}
            placeholder="Enter password"
            className="text-white w-full outline-none bg-transparent border border-gray-600 rounded-xl px-5 py-3 placeholder:text-gray-400 
                       focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 transition duration-300"
          />

          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            type="password"
            value={confirmPassword}
            placeholder="Confirm password"
            className="text-white w-full outline-none bg-transparent border border-gray-600 rounded-xl px-5 py-3 placeholder:text-gray-400 
                       focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 transition duration-300"
          />

          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl px-5 py-3 w-full 
                       transition duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-400 hover:underline transition duration-300">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
