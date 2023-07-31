<template>
  <div id="app">
    <TheNavbar />
    <router-view id="router-view" />
    <TheFooter />
  </div>
</template>

<script>
import TheNavbar from "./components/NavbarComponent.vue";
import TheFooter from "./components/FooterComponent.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    TheFooter,
    TheNavbar,
  },
  created() {
    if (
      !this.$store.state.accountModule.logged &&
      this.$route.fullPath != "/login"
    ) {
      this.$router.push({ name: "Login" });
    } else {
      this.loadCart(this.userCart);
    }
  },
  methods: {
    ...mapActions("cartModule", ["loadCart"]),
  },
  computed: {
    ...mapState({
      userCart: (state) => state.accountModule.cart,
      products: (state) => state.productModule.products,
    }),
  },
  watch: {
    userCart(value) {
      this.loadCart(value);
    },
  },
};
</script>

<style>
#router-view {
  padding-bottom: 130px;
  padding-top: 40px;
}
</style>
