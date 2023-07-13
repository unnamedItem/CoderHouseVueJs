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
            this.$emit("addToCart", this.product.id);
        },
        handleInfoEvent() {
            this.$router.push({ name: "Product", query: { id: this.product.id }, params: { user: this.$route.params.user } });
        }
    },
}
</script>

<style scoped>
.product-card {
    height: 100%;
}
</style>