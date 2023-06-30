<template>
    <b-overlay :show="isLoading">
        <b-row class="grid">
            <b-col cols="12" sm="6" md="4" lg="3" v-for="(product, index) in products" :key="index">
                <ProductCard :product="product" @addToCart="addToCart($event)" />
            </b-col>
        </b-row>
    </b-overlay>
</template>


<script>
import ProductCard from './ProductCard.vue'

const axios = require('axios');
const baseUrl = process.env.VUE_APP_MOCKAPI_URL;
const endpoint = baseUrl + '/products';

export default {
    name: "ProductList",
    components: {
        ProductCard,
    },
    data() {
        return {
            products: [],
            isLoading: true,
        }
    },
    created() {
        this.getProducts();
    },
    methods: {
        addToCart(id) {
            this.$emit("addToCart", id);
        },
        created() {
            this.getProducts();
        },
        getProducts() {
            axios.get(endpoint)
                .then((response) => {
                    this.products = response.data;
                    this.isLoading = false;
                })
                .catch((err) => { console.error(`${err}`) })
        }
    }
}
</script>

<style scoped>
.grid {
    margin-left: 5%;
    margin-right: 5%;
}
</style>