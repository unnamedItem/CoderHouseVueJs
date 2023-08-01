<template>
  <b-overlay :show="!products.length">
    <b-row class="grid">
      <b-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="(product, index) in productsFiltered"
        :key="index"
      >
        <ProductCard :product="product" />
      </b-col>
    </b-row>
  </b-overlay>
</template>


<script>
import { mapState } from "vuex";
import ProductCard from "./ProductCard.vue";

export default {
  name: "ProductList",
  components: {
    ProductCard,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.productModule.products,
    }),
    productsFiltered() {
      const tag = this.$route.query.tag;
      const searchQuery = this.$route.query.search;
      return this.products.filter((prod) => {
        const matchTag = prod.tags.includes(tag) || !tag;
        const matchSearchQuery = prod.name.toLowerCase().includes(searchQuery) || !searchQuery;
        return matchTag && matchSearchQuery;
      });
    },
  },
};
</script>

<style scoped>
.grid {
  margin-left: 5%;
  margin-right: 5%;
}
</style>