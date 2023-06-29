<template>
  <div id="app">
    <TheNavbar :cartList="cartList" @addItem="addItem($event)" @subItem="subItem($event)" @removeItem="removeItem($event)"/>
    <ProductList :products="products" :cartList="cartList" @addToCart="addToCart($event)"/>
    <TheFooter/>
  </div>
</template>

<script>
import TheNavbar from './components/NavbarComponent.vue';
import TheFooter from './components/FooterComponent.vue';
import ProductList from './components/ProductList';
import products from "@/assets/json/items.json";

export default {
  name: "App",
  components: {
    ProductList,
    TheNavbar,
    TheFooter,
  },
  data() {
    return {
      products: products,
      cartList: [],
    };
  },
  created() {
    localStorage.setItem("user", JSON.stringify({password: "123"}));
  },
  methods: {
    addToCart(id) {
      let product = {...this.products.find(prod => prod.id === id)};
      const isAlreadyInCart = this.cartList.some(prod => prod.id === id);
      if (isAlreadyInCart) {
        const productIndex = this.cartList.findIndex(prod => prod.id === id);
        this.cartList[productIndex].quantity += 1;
      } else {
        this.cartList.push(product);
      }
    },
    addItem(id) {
      const productIndex = this.cartList.findIndex(prod => prod.id === id);
      this.cartList[productIndex].quantity += 1;
    },
    subItem(id) {
      const productIndex = this.cartList.findIndex(prod => prod.id === id);
      this.cartList[productIndex].quantity -= 1;
      if (this.cartList[productIndex].quantity <= 0) {
        this.cartList.splice(productIndex, 1);
      }
    },
    removeItem(id) {
      const productIndex = this.cartList.findIndex(prod => prod.id === id);
      this.cartList.splice(productIndex, 1);
    }
  }
};
</script>

<style></style>
