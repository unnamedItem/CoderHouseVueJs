<template>
    <div class="product-card py-2">
        <b-card :title="product.name" :img-src="product.img" border-variant="dark" footer-border-variant="dark"
            img-height="400" class="product-card">
            <template #footer>
                <b-button @click="handleInfoEvent" class="mx-1" variant="danger"><b-icon
                        icon="info-circle"></b-icon></b-button>
                <b-button @click="addToCart" class="mx-1" variant="danger"><b-icon icon="cart"></b-icon></b-button>
            </template>
        </b-card>
    </div>
</template>


<script>
export default {
    name: "ProductCard",
    props: {
        product: Object
    },
    methods: {
        addToCart() {
            
        },
        handleInfoEvent() {
            this.$router.push({ path: `/product/${this.product.id}` });
        }
    },
}
</script>

<style scoped>
.product-card {
    height: 100%;
}
</style>