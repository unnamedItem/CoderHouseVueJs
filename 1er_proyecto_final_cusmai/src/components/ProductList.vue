<template>
    <b-row class="grid">
        <b-col cols="12" sm="6" md="4" lg="3" v-for="(product, index) in products" :key="index">
            <ProductCard :product="product" @addToCart="addToCart($event)"/>
        </b-col>
    </b-row>
</template>


<script>
import ProductCard from './ProductCard.vue'

export default {
    name: "ProductList",
    components: {
        ProductCard,
    },
    props: {
        products: Array,
        cartList: Array
    },
    methods: {
        addToCart(id) {
            this.$emit("addToCart", id);
        }
    }
}
</script>

<style scoped>
.grid {
    margin: 5%;
}
</style>