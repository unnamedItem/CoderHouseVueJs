import { userService } from "@/_services/user.service";

const setUserCart = (cart) => cart.map(product => new Object({ id: product.id, quantity: product.quantity }));

export const cartModule = {
  namespaced: true,
  state: {
    cart: [],
  },
  mutations: {
    loadCart(state, cart) {
      state.cart = cart;
    },
    addToCart(state, { product, userId, cartId }) {
      state.cart.push(product);
      userService.updateUserCart(userId, { cart: setUserCart(state.cart) }, cartId);
    },
    addItem(state, { idx, userId, cartId }) {
      state.cart[idx].quantity += 1;
      userService.updateUserCart(userId, { cart: setUserCart(state.cart) }, cartId);
    },
    subItem(state, { idx, userId, cartId }) {
      state.cart[idx].quantity -= 1;
      if (state.cart[idx].quantity <= 0) {
        state.cart.splice(idx, 1);
      }
      userService.updateUserCart(userId, { cart: setUserCart(state.cart) }, cartId);
    },
    removeItem(state, { idx, userId, cartId }) {
      state.cart.splice(idx, 1);
      userService.updateUserCart(userId, { cart: setUserCart(state.cart) }, cartId);
    },
    removeAllItems(state, { userId, cartId }) {
      state.cart = [];
      userService.clearUserCart(userId, cartId);
    },
  },
  actions: {
    loadCart({ commit, rootState }, userCart) {
      const cart = userCart.map((item) => {
        let product = rootState.productModule.products.find((prod) => prod.id === item.id);
        product.quantity = item.quantity;
        return product;
      });
      commit("loadCart", cart);
    },
    addToCart({ state, commit, rootState }, product) {
      const isAlreadyInCart = state.cart.some(prod => prod.id === product.id);
      if (isAlreadyInCart) {
        const productIndex = state.cart.findIndex(prod => prod.id === product.id);
        commit("addItem", { idx: productIndex, userId: rootState.accountModule.user.id, cartId: rootState.accountModule.cartId });
      } else {
        let productCopy = JSON.parse(JSON.stringify(product));
        productCopy.quantity = 1;
        commit("addToCart", { product: productCopy, userId: rootState.accountModule.user.id, cartId: rootState.accountModule.cartId });
      }
    },
    addItem({ state, commit, rootState }, product) {
      const productIndex = state.cart.findIndex(prod => prod.id === product.id);
      commit("addItem", { idx: productIndex, userId: rootState.accountModule.user.id, cartId: rootState.accountModule.cartId });
    },
    subItem({ state, commit, rootState }, product) {
      const productIndex = state.cart.findIndex(prod => prod.id === product.id);
      commit("subItem", { idx: productIndex, userId: rootState.accountModule.user.id, cartId: rootState.accountModule.cartId });
    },
    removeItem({ state, commit, rootState }, product) {
      const productIndex = state.cart.findIndex(prod => prod.id === product.id);
      commit("removeItem", { idx: productIndex, userId: rootState.accountModule.user.id, cartId: rootState.accountModule.cartId });
    },
    removeAllItems({ commit, rootState }) {
      commit("removeAllItems", { userId: rootState.accountModule.user.id, cartId: rootState.accountModule.cartId });
    },
  },
}