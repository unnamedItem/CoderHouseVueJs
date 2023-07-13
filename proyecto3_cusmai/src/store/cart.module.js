export const cartModule = {
  namespaced: true,
  state: {
    cart: []
  },
  mutations: {
    addToCart(state, product) {
      state.cart.push(product);
    },
    addItem(state, idx) {
      state.cart[idx].quantity += 1;
    },
    subItem(state, idx) {
      state.cart[idx].quantity -= 1;
      if (state.cart[idx].quantity <= 0) {
        state.cart.splice(idx, 1);
      }
    },
    removeItem(state, idx) {
      state.cart.splice(idx, 1);
    },
    removeAllItems(state) {
      state.cart = [];
    },
  },
  actions: {
    addToCart({ state, commit }, product) {
      const isAlreadyInCart = state.cart.some(prod => prod.id === product.id);
      if (isAlreadyInCart) {
        const productIndex = state.cart.findIndex(prod => prod.id === product.id);
        commit("addItem", productIndex);
      } else {
        commit("addToCart", product);
      }
    },
    addItem({ state, commit }, product) {
      const productIndex = state.cart.findIndex(prod => prod.id === product.id);
      commit("addItem", productIndex)
    },
    subItem({ state, commit }, product) {
      const productIndex = state.cart.findIndex(prod => prod.id === product.id);
      commit("subItem", productIndex)
    },
    removeItem({ state, commit }, product) {
      const productIndex = state.cart.findIndex(prod => prod.id === product.id);
      commit("removeItem", productIndex)
    },
    removeAllItems({ commit }) {
      commit("removeAllItems")
    },
  },
}