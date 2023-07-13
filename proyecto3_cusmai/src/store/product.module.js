import { productService } from "@/_services/product.service";

export const productModule = {
  namespaced: true,
  state: {
    products: await productService.getAllProducts()
  },
  mutations: {
    loadProducts(state, products) {
      state.products = products;
    }
  },
  actions: {
    getProducts({ commit }) {
      productService.getAllProducts()
        .then(products => { commit("loadProducts", products) })
    }
  },
}