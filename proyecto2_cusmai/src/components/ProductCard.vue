<template>
    <div class="product-card py-2">
        <b-card
            :title="product.name"
            :img-src="product.img"
            border-variant="dark"
            footer-border-variant="dark"
            img-height="400"
            class="product-card"
        >
            <template #footer>
                <b-button v-b-modal="`product-${product.id}`" class="mx-1" variant="danger"><b-icon icon="info-circle"></b-icon></b-button>
                <b-button @click="addToCart" class="mx-1" variant="danger"><b-icon icon="cart"></b-icon></b-button>
            </template>     
        </b-card>

        <b-modal :id="`product-${product.id}`" :title="product.name" hide-footer>
            <ProductCardInfo :product="product"/>
        </b-modal>
    </div>
</template>


<script>
import ProductCardInfo from './ProductCardInfo.vue';

export default {
    name: "ProductCard",
    components: {
        ProductCardInfo
    },
    props: {
        product: Object
    },
    methods: {
        addToCart() {
            this.$emit("addToCart", this.product.id);
        }
    },
}
</script>

<style scoped>
.product-card {
    height: 100%;
}
</style>