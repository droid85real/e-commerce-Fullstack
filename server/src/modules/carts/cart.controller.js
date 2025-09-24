// cart.controller.js
import CartRepository from "./cart.repository.js";

export default class CartController {
  // get cart middleware
  getCart(req, res) {
    const userId = req.userId;
    const result = CartRepository.getCartByUserId(userId);

    switch (result.status) {
      case "SUCCESS":
        return res.status(200).json(result.cart);

      case "NOT_FOUND":
        return res.status(404).json({ message: "Cart is not found" });
    }
  }

  //add item middleware
  postCartItem(req, res) {
    const userId = req.userId;
    const { productId, productName, price, quantity } = req.body;

    // Basic validation
    if (!productId || !productName) {
      return res
        .status(400)
        .json({ message: "Product ID and name are required" });
    }

    if (typeof price !== "number" || price <= 0) {
      return res
        .status(400)
        .json({ message: "Price must be a positive number" });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const result = CartRepository.addItemToCart(
      userId,
      productId,
      productName,
      price,
      quantity
    );

    switch (result.status) {
      case "SUCCESS":
        return res.status(201).json(result.cart);
      default:
        return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // update item middleware
  putCartItem(req, res) {
    const userId = req.userId;
    const { productId, quantity } = req.body;

    // Basic validation
    if (!productId) {
      return res.status(400).json({ message: "Product ID required" });
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const result = CartRepository.updateCartItem(userId, productId, quantity);

    switch (result.status) {
      case "SUCCESS":
        return res.status(200).json(result.cart);
      case "CART_NOT_FOUND":
        return res.status(404).json({ message: "Cart not found" });
      case "ITEM_NOT_FOUND":
        return res.status(404).json({ message: "Item not found" });
      default:
        return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // delete cart item middleware
  deleteCartItem(req, res) {
    const userId = req.userId;
    const productId = req.params.id;

    // Basic validation
    if (!productId) {
      return res
        .status(400)
        .json({ message: "Product ID  required" });
    }

    const result = CartRepository.removeCartItem(userId, productId);

    switch (result.status) {
      case "SUCCESS":
        return res.status(200).json(result.cart);
      case "CART_NOT_FOUND":
        return res.status(404).json({ message: "Cart not found" });
      case "ITEM_NOT_FOUND":
        return res.status(404).json({ message: "Item not found" });
      default:
        return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // clear cart middleware
  deleteAllCartItem(req, res) {
    const userId = req.userId;
    const result = CartRepository.clearCart(userId);

    switch (result.status) {
      case "SUCCESS":
        return res.status(200).json(result.cart);
      case "CART_NOT_FOUND":
        return res.status(404).json({ message: "Cart not found" });
      default:
        return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
