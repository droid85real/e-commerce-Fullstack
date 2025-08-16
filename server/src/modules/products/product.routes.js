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

export default productRoutes;