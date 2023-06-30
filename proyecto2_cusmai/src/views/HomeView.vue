<template>
    <div>
        <ProductList @addToCart="addToCart($event)" />
    </div>
</template>
  
<script>
import ProductList from '../components/ProductList';

export default {
    name: "App",
    components: {
        ProductList,
    },
    methods: {
        addToCart(id) {
            this.$emit("addToCart", id);
        },
    }
};
</script>
  
<style></style>
  