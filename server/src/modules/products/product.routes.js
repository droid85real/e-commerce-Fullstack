// product.routes.js
import express from "express";
import ProductController from "./product.controller.js";
import ProductRepository from "./product.repository.js";
import jwtAuth from "../../middleware/jwt.middleware.js";

// initialise express router
const productRoutes=express.Router();

// creating an instance of ProductRepository
const productRepository=new ProductRepository();

// creating an instance of ProductController
const productController=new ProductController(productRepository); // injecting userRepository

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     description: Returns a list of all products in the system.
 *     responses:
 *       200:
 *         description: Successfully retrieved products
 *       404:
 *         description: No products found
 *       500:
 *         description: Internal server error
 */

productRoutes.get(
    "/", //req already completed /api/products
    productController.getAllProducts
);


/**
 * @swagger
 * /api/products/filter:
 *   get:
 *     summary: Filter products
 *     tags: [Products]
 *     description: Filter products by price range and category
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum product price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum product price
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Product category
 *     responses:
 *       200:
 *         description: Filtered products returned
 *       404:
 *         description: No products found
 *       500:
 *         description: Internal server error
 */

// http://localhost:5000/api/products/filter?minPrice=10&maxPrice=2000&category=Clothing
productRoutes.get(
    "/filter",
    productController.getFilteredProducts
);


/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add new product
 *     tags: [Products]
 *     description: Create a new product (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - desc
 *               - price
 *               - imageUrl
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               desc:
 *                 type: string
 *               price:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *               category:
 *                 type: string
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *               rating:
 *                 type: number
 *               discountPercentage:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid product data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

// add product
productRoutes.post("/",jwtAuth,productController.addProduct);

/**
 * @swagger
 * /api/products/trending:
 *   get:
 *     summary: Get trending products
 *     tags: [Products]
 *     description: Returns top trending products sorted by rating and discount.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Number of products to return (default 10)
 *     responses:
 *       200:
 *         description: List of trending products
 *       404:
 *         description: No trending products found
 *       500:
 *         description: Internal server error
 */

// trending products
productRoutes.get("/trending", productController.getTrendingProducts);


/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB product ID
 *     responses:
 *       200:
 *         description: Product found
 *       400:
 *         description: Invalid product ID
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

// http://localhost:3000/api/products/1
productRoutes.get(
    "/:id", //req already completed /api/products
    productController.getOneProduct
);


/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     description: Delete a product (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB product ID
 *     responses:
 *       200:
 *         description: Product deleted
 *       400:
 *         description: Invalid product ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

// DELETE one product
productRoutes.delete(
  "/:id", // Already under /api/products
  jwtAuth,
  productController.deleteProduct
);

export default productRoutes;