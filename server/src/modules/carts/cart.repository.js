// cart.repository.js
import CartModel from "./cart.model.js";

export default class CartRepository {
  // method to get cart by user id
  static getCartByUserId(userId) {
    const cart = carts.find((c) => c.userId === userId);
    return cart ? { status: "SUCCESS", cart } : { status: "NOT_FOUND" };
  }

  // method to add item to cart
  static addItemToCart(userId, productId, productName, price, quantity) {
    const result = this.getCartByUserId(userId);
    let cart;

    if (result.status === "NOT_FOUND") {
      // create a new cart for the user
      cart = new CartModel(Date.now().toString(), userId, []);
      carts.push(cart);
    } else {
      cart = result.cart;
    }

    // check if item already exist in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity+=quantity;
      cart.cartTotal=cart.calculateCartTotal();
      return { status: "SUCCESS", cart };
    }

    // Add new item
    cart.items.push({
      productId,
      productName,
      price,
      quantity,
    });

    // recalculate the cart total
    cart.cartTotal = cart.calculateCartTotal();

    return { status: "SUCCESS", cart };
  }

  // method to update cart item
  static updateCartItem(userId, productId, quantity) {
    const result = this.getCartByUserId(userId);
    let cart;

    if (result.status === "NOT_FOUND") {
      // create a new cart for the user
      return { status: "CART_NOT_FOUND" };
    } else {
      cart = result.cart;
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex === -1) {
      return { status: "ITEM_NOT_FOUND" };
    }

    // update the quantity
    cart.items[itemIndex].quantity = quantity;
    cart.cartTotal = cart.calculateCartTotal();

    return { status: "SUCCESS", cart };
  }

  // method to delete specific item from cart
  static removeCartItem(userId, productId) {
    const result = this.getCartByUserId(userId);
    let cart;

    if (result.status === "NOT_FOUND") {
      // create a new cart for the user
      return { status: "CART_NOT_FOUND" };
    } else {
      cart = result.cart;
    }

    const itemIndex = cart.items.findIndex(
      (item) => String(item.productId) === String(productId)
    );

    if (itemIndex === -1) {
      return { status: "ITEM_NOT_FOUND" };
    }

    // remove item
    cart.items.splice(itemIndex, 1);

    // update cart total
    cart.cartTotal = cart.calculateCartTotal();

    return { status: "SUCCESS", cart };
  }

  // method to clear whole cart
  static clearCart(userId) {
    const result = this.getCartByUserId(userId);
    let cart;

    if (result.status === "NOT_FOUND") {
      // create a new cart for the user
      return { status: "CART_NOT_FOUND" };
    } else {
      cart = result.cart;
    }

    // clear
    cart.items=[];

    // update cart total
    cart.cartTotal = 0;

    return { status: "SUCCESS",cart};
  }
}

// sample cart mock data
let carts = [
  new CartModel(
    "1756862084457", // cartId
    "1756862084954", // user2 userid
    [
      {
        productId: "1756862084956",
        productName: "Laptop",
        price: 50000,
        quantity: 1,
      },
      {
        productId: "1756862084957",
        productName: "Mouse",
        price: 1500,
        quantity: 2,
      },
    ]
  ),
];
