import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // icons for mobile menu

// Reusable Dropdown Component
const Dropdown = ({ title, columns, banners, mobile }) => {
  const [open, setOpen] = useState(false);

  if (mobile) {
    // Mobile: Click-to-toggle
    return (
      <div className="w-full">
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left py-2 font-semibold hover:text-pink-500 flex justify-between"
        >
          {title}
          <span>{open ? "-" : "+"}</span>
        </button>
        {open && (
          <div className="pl-4 space-y-4">
            {columns.map((col, i) => (
              <div key={i}>
                <h3 className="font-bold mb-2">{col.title}</h3>
                <ul className="space-y-1 text-gray-600">
                  {col.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            {banners && (
              <div className="grid grid-cols-2 gap-2 mt-3">
                {banners.map((banner, i) => (
                  <div key={i} className="bg-gray-100 rounded-md overflow-hidden">
                    <img src={banner.img} alt={banner.title} className="w-full h-20 object-cover" />
                    <div className="p-2 text-sm">
                      <h4 className="font-bold">{banner.title}</h4>
                      <p>Flat {banner.discount}% off</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Desktop: Hover mega menu
  return (
    <li
      className="relative cursor-pointer hover:text-pink-500"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {title}
      {open && (
        <div className="absolute left-0 top-12 w-[1000px] bg-white shadow-lg p-6 rounded-lg z-50">
          <div className="grid grid-cols-4 gap-8">
            {columns.map((col, i) => (
              <div key={i}>
                <h3 className="font-bold mb-3 border-b pb-2">{col.title}</h3>
                <ul className="space-y-2 text-gray-600">
                  {col.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {banners && (
            <div className="grid grid-cols-4 gap-4 mt-6">
              {banners.map((banner, i) => (
                <div key={i} className="bg-gray-100 rounded-lg overflow-hidden hover:shadow-md">
                  <img src={banner.img} alt={banner.title} className="w-full h-32 object-cover" />
                  <div className="p-3">
                    <h4 className="font-bold">{banner.title}</h4>
                    <p className="text-sm">
                      Flat <span className="font-bold">{banner.discount}% off</span>
                    </p>
                    <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm">
                      SHOP NOW
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </li>
  );
};

const Testing = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full shadow-md bg-white fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <h1 className="text-2xl font-bold">MyShop</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-semibold">
          <li className="cursor-pointer hover:text-pink-500">HOME</li>

          {/* Categories */}
          <Dropdown
            title="CATEGORIES"
            columns={[
              { title: "Electronics", items: ["Desktop", "Laptop", "Camera", "Tablet", "Headphone"] },
              { title: "Men's", items: ["Formal", "Casual", "Sports", "Jacket", "Sunglasses"] },
              { title: "Women's", items: ["Formal", "Casual", "Perfume", "Cosmetics", "Bags"] },
              { title: "Electronics", items: ["Smart Watch", "Smart TV", "Keyboard", "Mouse", "Microphone"] },
            ]}
            banners={[
              { title: "Headphone", discount: 30, img: "/assets/headphone.jpg" },
              { title: "Men's Fashion", discount: 19, img: "/assets/men.jpg" },
              { title: "Women's Fashion", discount: 35, img: "/assets/women.jpg" },
              { title: "Mouse Collection", discount: 50, img: "/assets/mouse.jpg" },
            ]}
          />

          {/* Men's */}
          <Dropdown
            title="MEN'S"
            columns={[
              { title: "Clothing", items: ["Shirts", "T-Shirts", "Jeans", "Jackets", "Suits"] },
              { title: "Footwear", items: ["Casual Shoes", "Formal Shoes", "Sneakers", "Sandals"] },
              { title: "Accessories", items: ["Wallets", "Belts", "Sunglasses", "Watches"] },
              { title: "Sportswear", items: ["Track Pants", "Hoodies", "Running Shoes", "Shorts"] },
            ]}
          />

          {/* Women's */}
          <Dropdown
            title="WOMEN'S"
            columns={[
              { title: "Clothing", items: ["Dresses", "Tops", "Skirts", "Jeans", "Ethnic Wear"] },
              { title: "Footwear", items: ["Heels", "Flats", "Boots", "Sandals"] },
              { title: "Accessories", items: ["Bags", "Scarves", "Sunglasses", "Jewelry"] },
              { title: "Beauty", items: ["Perfume", "Cosmetics", "Skincare", "Haircare"] },
            ]}
          />

          {/* Jewelry */}
          <Dropdown
            title="JEWELRY"
            columns={[
              { title: "Gold", items: ["Rings", "Necklaces", "Bracelets"] },
              { title: "Silver", items: ["Earrings", "Chains", "Anklets"] },
              { title: "Diamond", items: ["Rings", "Bracelets", "Pendants"] },
              { title: "Fashion", items: ["Beads", "Artificial", "Crystal"] },
            ]}
          />

          {/* Perfume */}
          <Dropdown
            title="PERFUME"
            columns={[
              { title: "Men", items: ["Deodorants", "Perfumes", "Body Spray"] },
              { title: "Women", items: ["Perfumes", "Mist", "Deodorants"] },
              { title: "Brands", items: ["Gucci", "Calvin Klein", "Hugo Boss"] },
              { title: "Others", items: ["Unisex", "Luxury", "Daily Use"] },
            ]}
          />

          <li className="cursor-pointer hover:text-pink-500">BLOG</li>
          <li className="cursor-pointer hover:text-pink-500">HOT OFFERS</li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
          <p className="font-semibold">HOME</p>

          <Dropdown
            mobile
            title="CATEGORIES"
            columns={[
              { title: "Electronics", items: ["Desktop", "Laptop", "Camera", "Tablet", "Headphone"] },
              { title: "Men's", items: ["Formal", "Casual", "Sports", "Jacket", "Sunglasses"] },
              { title: "Women's", items: ["Formal", "Casual", "Perfume", "Cosmetics", "Bags"] },
              { title: "Electronics", items: ["Smart Watch", "Smart TV", "Keyboard", "Mouse", "Microphone"] },
            ]}
            banners={[
              { title: "Headphone", discount: 30, img: "/assets/headphone.jpg" },
              { title: "Men's Fashion", discount: 19, img: "/assets/men.jpg" },
              { title: "Women's Fashion", discount: 35, img: "/assets/women.jpg" },
              { title: "Mouse Collection", discount: 50, img: "/assets/mouse.jpg" },
            ]}
          />

          <Dropdown mobile title="MEN'S" columns={[{ title: "Clothing", items: ["Shirts", "T-Shirts", "Jeans"] }]} />
          <Dropdown mobile title="WOMEN'S" columns={[{ title: "Clothing", items: ["Dresses", "Tops", "Skirts"] }]} />
          <Dropdown mobile title="JEWELRY" columns={[{ title: "Gold", items: ["Rings", "Necklaces"] }]} />
          <Dropdown mobile title="PERFUME" columns={[{ title: "Men", items: ["Perfumes", "Deodorants"] }]} />

          <p className="font-semibold">BLOG</p>
          <p className="font-semibold">HOT OFFERS</p>
        </div>
      )}
    </nav>
  );
};

export default Testing;

