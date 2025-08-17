import React, { createContext, useState } from 'react'


export const ProductContext=createContext();

const ProductContextProvider =(props)=>{

 const fetchProductById = async (id) => {
  let response = await fetch(`https://dummyjson.com/products/${id}`);
  let json = await response.json();
  return json;
};

const contextValue={
    fetchProductById
};
    return(
         <ProductContext.Provider value={contextValue}>
            {props.children}
         </ProductContext.Provider>
    )

}
export default ProductContextProvider;
