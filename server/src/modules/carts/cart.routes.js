// cart.routes.js
import express from "express";
import CartController from "./cart.controller.js";
import CartRepository from "./cart.repository.js";

// initialise express router
const cartRoutes=express.Router();

// create instance of cart repository
const cartRepository=new CartRepository();

// create instance of cart controller
const cartController=new CartController(cartRepository); // injecting cart repository

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get the authenticated user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 */
// to get cart 
cartRoutes.get(
    "/", // http://localhost:3000/api/cart/
    cartController.getCart
);

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 65f1c7a9e7d8c1a123456789
 *               quantity:
 *                 type: integer
 *                 example: 2
 *               size:
 *                 type: string
 *                 example: M
 *     responses:
 *       200:
 *         description: Item added successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
// to add items to cart
cartRoutes.post(
    "/",
    cartController.postCartItem
);

/**
 * @swagger
 * /api/cart:
 *   put:
 *     summary: Update quantity of an item in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 65f1c7a9e7d8c1a123456789
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart item updated
 *       404:
 *         description: Item or cart not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
// to update items in cart
cartRoutes.put(
    "/",
    cartController.putCartItem
);

/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     summary: Clear the user's entire cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 */
// to clear all items from cart
cartRoutes.delete(
    "/clear",//clearCart
    cartController.deleteAllCartItem
);

/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: Remove a specific item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID to remove
 *         schema:
 *           type: string
 *           example: 65f1c7a9e7d8c1a123456789
 *     responses:
 *       200:
 *         description: Item removed successfully
 *       204:
 *         description: Cart became empty and was deleted
 *       404:
 *         description: Item or cart not found
 *       400:
 *         description: Invalid ID
 *       500:
 *         description: Internal server error
 */
// to delete items from cart
cartRoutes.delete(
    "/:id", // http://localhost:3000/api/cart/productId 
    cartController.deleteCartItem
);

export default cartRoutes;