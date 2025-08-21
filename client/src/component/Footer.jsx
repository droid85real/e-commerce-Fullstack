import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";


const Footer = () => {
  return (
    
    <footer className="bg-gray-900 text-gray-300 py-10 ">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">ShopEase</h2>
          <p className="text-sm">
            Your one-stop online shop for fashion, electronics, and more. 
            Quality products at the best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/shop" className="hover:text-white">Shop</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Customer Service</h3>
          <ul className="space-y-2">
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            <li><a href="/returns" className="hover:text-white">Returns</a></li>
            <li><a href="/orders" className="hover:text-white">Track Order</a></li>
            <li><a href="/support" className="hover:text-white">Support</a></li>
          </ul>
        </div>

        {/* Social & Payment */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Connect with Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-blue-500"><FaFacebook size={20} /></a>
            <a href="#" className="hover:text-pink-500"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-sky-400"><FaTwitter size={20} /></a>
          </div>

          <h3 className="text-lg font-semibold text-white mb-3">We Accept</h3>
          <div className="flex space-x-4">
            <FaCcVisa size={30} />
            <FaCcMastercard size={30} />
            <FaCcPaypal size={30} />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;




  