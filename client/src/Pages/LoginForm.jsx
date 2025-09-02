import { useState } from "react";
import { useNavigate } from "react-router-dom";




export default function LoginForm() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Response:", res.status, data);

      if (res.status === 200) {
        // ✅ Successful login
        setUser(data);
        navigate('/home');
        localStorage.setItem("token",data.token);
        setError("");
      } else if (res.status === 401) {
        // ❌ Incorrect password
        setError("Incorrect password. Try again.");
      } else if (res.status === 404) {
        // ❌ User not found
        setError("No account found with this email.");
      } else {
        // ❌ Other errors
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-pink-400 via-purple-500 to-cyan-400 font-[Poppins]">
      <div className="bg-[#1a1a1a] border border-purple-400 shadow-2xl rounded-2xl p-10 w-[350px] transform transition-all duration-500 hover:scale-105">

        {/* Title */}
        <h1 className="text-3xl font-bold text-white text-center mb-4 transition-all duration-500 hover:text-purple-300">
          Welcome Back 👋
        </h1>
        <p className="text-gray-400 text-center mb-8 text-sm">
          Please login to your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            value={email}
            placeholder="Enter your email"
            className="text-white w-full outline-none bg-transparent border border-gray-600 rounded-xl px-5 py-3 placeholder:text-gray-400 
                       focus:border-purple-400 focus:shadow-lg focus:shadow-purple-500/30 transition duration-300"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            value={password}
            placeholder="Enter your password"
            className="text-white w-full outline-none bg-transparent border border-gray-600 rounded-xl px-5 py-3 placeholder:text-gray-400 
                       focus:border-purple-400 focus:shadow-lg focus:shadow-purple-500/30 transition duration-300"
          />

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl px-5 py-3 w-full 
                       transition duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
          >
            Log In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don’t have an account?{" "}
          <span
            className="text-purple-400 hover:underline cursor-pointer"
            onClick={()=>navigate('/signup')}
          >
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
};
