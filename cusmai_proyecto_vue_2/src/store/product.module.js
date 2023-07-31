import { productService } from "@/_services/product.service";

export const productModule = {
  namespaced: true,
  state: {
    products: await productService.getAllProducts()
  }
}