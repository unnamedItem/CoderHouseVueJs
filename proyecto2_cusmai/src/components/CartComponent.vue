<template>
    <div>
        <div v-if="cartList?.length > 0">
            <b-row v-for="(product, index) in cartList" :key="index" class="cart-list">
                <b-col cols="12"><em><b>{{ product.name }}</b></em></b-col>
                <b-col cols="4">
                    <div class="product-img">
                        <img :src="product.img" :alt="product.name" width="100" height="100" class="pr-2 pb-2">
                    </div>
                </b-col>
                <b-col cols="8" class="my-auto">
                    <b-input-group>
                        <b-input-group-prepend>
                            <b-button sm variant="outline-danger" @click="subItem(product.id)">-</b-button>
                        </b-input-group-prepend>

                        <b-form-input sm disabled v-model="product.quantity" type="number" min="0"></b-form-input>

                        <b-input-group-append>
                            <b-button sm variant="outline-success" @click="addItem(product.id)">+</b-button>
                        </b-input-group-append>

                        <b-input-group-append>
                            <b-button sm variant="outline-danger" @click="removeItem(product.id)"><b-icon
                                    icon="trash"></b-icon></b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
            </b-row>

            <b-button block variant="danger">Finalizar compra</b-button>
        </div>
        <div v-else>
            <b-alert show variant="light" style="width:250px">
                <span>El carrito esta vacío</span>
            </b-alert>
        </div>
    </div>
</template>


<script>
export default {
    name: "CartComponent",
    props: {
        cartList: Array
    },
    methods: {
        addItem(id) {
            this.$emit("addItem", id);
        },
        subItem(id) {
            this.$emit("subItem", id);
        },
        removeItem(id) {
            this.$emit("removeItem", id);
        }
    }
}
</script>


<style scoped>
.cart-list {
    min-width: 300px;
    border: 1px solid lightgray;
    border-radius: 10px;
    margin: 10px;
}
</style>