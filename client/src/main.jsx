import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProductContextProvider from './Context/ProductContext.jsx'
import 'flowbite';
import { RouterProvider } from 'react-router-dom';
import router from "./router.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductContextProvider>
      <RouterProvider router={router} />
    </ProductContextProvider>
  </StrictMode>,
)
