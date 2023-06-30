<template>
  <div id="app">
    <TheNavbar :cartList="cartList" @logout="logout" />
    <router-view id="router-view" @addToCart="addToCart($event)" @addItem="addItem($event)" @subItem="subItem($event)"
      @removeItem="removeItem($event)" />
    <TheFooter />
  </div>
</template>

<script>
import TheNavbar from './components/NavbarComponent.vue';
import TheFooter from './components/FooterComponent.vue';

const axios = require('axios');
const baseUrl = process.env.VUE_APP_MOCKAPI_URL;
const endpointProducts = baseUrl + '/products';
// const endpointUsers = baseUrl + '/users';

export default {
  components: {
    TheFooter,
    TheNavbar,
  },
  data() {
    return {
      products: [],
      cartList: [],
    }
  },
  created() {
    this.getProducts();
  },
  methods: {
    addToCart(id) {
      let product = { ...this.products.find(prod => prod.id === id) };
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
    },
    getProducts() {
      axios.get(endpointProducts)
        .then((response) => { this.products = response.data })
        .catch((err) => { console.error(`${err}`) })
    },
    logout() {
      localStorage.removeItem("user");
      this.$router.push({name: "Login", params: {user: null}});
    }
  }
}
</script>

<style>
#router-view {
  padding-bottom: 130px;
  padding-top: 40px;
}
</style>
