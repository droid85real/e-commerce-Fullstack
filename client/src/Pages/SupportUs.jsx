import React, { useState } from "react";

export default function SupportUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Implement your backend call here
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-100 flex items-center justify-center px-4">
      <form
        className="bg-white/80 shadow-lg rounded-3xl p-8 w-full max-w-md space-y-6 backdrop-blur-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-cyan-900 mb-2 tracking-tight">
          Support Us ✦
        </h2>
        <p className="text-md text-cyan-800/70 mb-2">
          Love our store? Got feedback or want to help us grow? Share your thoughts below!
        </p>
        {!submitted ? (
          <>
            <input
              className="block w-full bg-cyan-50 border border-teal-100 rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              className="block w-full bg-cyan-50 border border-teal-100 rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              className="block w-full bg-cyan-50 border border-teal-100 rounded-xl px-4 py-3 mb-3 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-vertical"
              name="message"
              placeholder="Write your message…"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-300 text-cyan-900 font-semibold text-lg transition duration-200 hover:from-cyan-400 hover:to-teal-400 shadow-md"
              type="submit"
            >
              Send Message
            </button>
          </>
        ) : (
          <div className="text-teal-700 text-center font-bold mt-2 animate-pulse">
            Thank you for your support! 😊
          </div>
        )}
      </form>
    </div>
  );
}
