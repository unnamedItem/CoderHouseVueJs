export const cartModule = {
  state: {
    cart: []
  },
  mutations: {
  },
  actions: {
    addToCart(id) {
      let product = { ...this.products.find(prod => prod.id === id) };
      const isAlreadyInCart = this.cartList.some(prod => prod.id === id);
      if (isAlreadyInCart) {
        const productIndex = this.cartList.findIndex(prod => prod.id === id);
        this.cartList[productIndex].quantity += 1;
      } else {
        this.cartList.push(product);
      }
      this.updateUserCart();
    },
    addItem(id) {
      const productIndex = this.cartList.findIndex(prod => prod.id === id);
      this.cartList[productIndex].quantity += 1;
      this.updateUserCart();
    },
    subItem(id) {
      const productIndex = this.cartList.findIndex(prod => prod.id === id);
      this.cartList[productIndex].quantity -= 1;
      if (this.cartList[productIndex].quantity <= 0) {
        this.cartList.splice(productIndex, 1);
      }
      this.updateUserCart();
    },
    removeItem(id) {
      const productIndex = this.cartList.findIndex(prod => prod.id === id);
      this.cartList.splice(productIndex, 1);
      this.updateUserCart();
    },
    removeAllItems() {
      this.cartList = [];
      this.updateUserCart();
    },
  },
}