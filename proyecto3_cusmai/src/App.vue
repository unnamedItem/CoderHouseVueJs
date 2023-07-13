<template>
  <div id="app">
    <TheNavbar :cartList="cartList" @logout="logout" />
    <router-view id="router-view" :cartList="cartList" @addToCart="addToCart($event)" @addItem="addItem($event)"
      @subItem="subItem($event)" @removeAllItems="removeAllItems($event)" @removeItem="removeItem($event)" />
    <TheFooter />
  </div>
</template>

<script>
import TheNavbar from './components/NavbarComponent.vue';
import TheFooter from './components/FooterComponent.vue';

const axios = require('axios');
const baseUrl = process.env.VUE_APP_MOCKAPI_URL;
const endpointProducts = baseUrl + '/products';
const endpointUsers = baseUrl + '/users';

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
  computed: {
    user() {
      return this.$route.params.user;
    },
  },
  created() {
    this.getProducts();
    if (!this.$route.params.user) {
      this.$router.push("login");
    }
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
    getProducts() {
      axios.get(endpointProducts)
        .then((response) => {
          this.products = response.data;
          this.getCartList(this.$route.params.user);
        })
        .catch((err) => { console.error(`${err}`) })
    },
    logout() {
      localStorage.removeItem("user");
      this.$router.push({ name: "Login", params: { user: null } });
    },
    updateUserLocale(user) {
      localStorage.setItem("user", JSON.stringify(user));
    },
    updateUserCart() {
      let user = this.$route.params.user;
      let products = {};
      if (user) {
        this.cartList.forEach(product => { products[product.id] = product.quantity });
        user.products = products;
        axios.put(`${endpointUsers}/${user.id}`, user)
          .then((response) => { this.updateUserLocale(response.data) })
          .catch((err) => { console.error(`${err}`) })
      } else {
        localStorage.setItem("localCartList", JSON.stringify(this.cartList));
      }
    },
    getCartList(user) {
      if (!user) {
        this.cartList = JSON.parse(localStorage.getItem("localCartList")) || [];
      } else {
        let productsIds = user.products;
        this.cartList = Object.entries(productsIds).map(([id, quantity]) => {
          let product = JSON.parse(JSON.stringify(this.products.find(prod => prod.id === id)));
          if (product) {
            product.quantity = quantity;
            return product;
          } else {
            return null;
          }
        }).filter(prod => prod != null);
      }
    }
  },
  watch: {
    user(value) {
      this.getCartList(value);
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
