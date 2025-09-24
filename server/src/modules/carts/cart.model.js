// cart.model.js
export default class CartModel {
  constructor(cartId, userId, items = []) {
    this.cartId = cartId;
    this.userId = userId;
    this.items = items; // arrray of item { productId, productName, quantity, total}
    this.cartTotal = this.calculateCartTotal();
  }

  calculateCartTotal() {
    return this.items.reduce((sum, item) => sum + item.price*item.quantity, 0);
  }
}
