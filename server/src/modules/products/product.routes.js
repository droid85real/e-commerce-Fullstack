// product.routes.js
import express from "express";
import ProductController from "./product.controller.js";

// initialise express router
const productRoutes=express.Router();

// creating an instance of ProductController
const productController=new ProductController();

// on get req 
productRoutes.get(
    "/", //req already completed /api/products
    productController.getAllProducts
);

// http://localhost:5000/api/products/filter?minPrice=10&maxPrice=2000&category=Clothing
productRoutes.get(
    "/filter",
    productController.getFilteredProducts
);

// http://localhost:3000/api/products/1
productRoutes.get(
    "/:id", //req already completed /api/products
    productController.getOneProduct
);

export default productRoutes;