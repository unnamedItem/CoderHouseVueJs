import { productService } from "@/_services/product.service";

export const productModule = {
  namespaced: true,
  state: {
    products: await productService.getAllProducts()
  },
  actions: {
    getProducts({ commit }) {
      return productService.getAllProducts()
        .then(products => { commit('getProducts', products) })
        .catch(err => { throw err })
    },
    deleteProduct({ dispatch }, product) {
      return productService.deleteProduct(product)
        .then((prod) => {
          dispatch('getProducts');
          return prod;
        })
        .catch(err => { throw err })
    },
    addProduct({ dispatch }, product) {
      return productService.addProduct(product)
        .then((prod) => {
          dispatch('getProducts');
          return prod;
        })
        .catch(err => { throw err })
    },
    updateProduct({ dispatch }, product) {
      return productService.updateProduct(product)
        .then((prod) => {
          dispatch('getProducts');
          return prod;
        })
        .catch(err => { throw err })
    }
  },
  mutations: {
    getProducts(state, products) {
      state.products = products;
    },
  }
}