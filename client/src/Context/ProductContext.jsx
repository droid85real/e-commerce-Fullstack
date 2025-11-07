import React, { createContext, useState } from 'react'
import { API_BASE } from "@/api"; // Import API_BASE

export const ProductContext = createContext();

const ProductContextProvider = (props) => {

  const fetchProductById = async (id) => {
    try {
      // ✅ FIXED: Use API_BASE to construct the full URL
      const response = await fetch(`${API_BASE}/api/products/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`);
      }
      
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error; // Re-throw to handle in component
    }
  };

  const [search, setSearch] = useState("");
  
  const changeHandler = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  }

  const contextValue = {
    fetchProductById,
    search,
    setSearch,
    changeHandler
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductContextProvider;