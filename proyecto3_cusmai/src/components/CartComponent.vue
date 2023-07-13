<template>
    <div>
        <div v-if="cartList?.length > 0">
            <b-row v-for="(product, index) in cartList" :key="index" class="cart-list">
                <b-col cols="12"><em><b>{{ product.name }}</b></em></b-col>
                <b-col cols="3">
                    <div class="product-img">
                        <img :src="product.img" :alt="product.name" width="100" height="100" class="pr-2 pb-2">
                    </div>
                </b-col>
                <b-col cols="6" class="my-auto">
                    <b-input-group>
                        <b-input-group-prepend>
                            <b-button sm variant="outline-danger" @click="subItem(product)">-</b-button>
                        </b-input-group-prepend>

                        <b-form-input sm disabled v-model="product.quantity" type="number" min="0"></b-form-input>

                        <b-input-group-append>
                            <b-button sm variant="outline-success" @click="addItem(product)">+</b-button>
                        </b-input-group-append>

                        <b-input-group-append>
                            <b-button sm variant="outline-danger" @click="removeItem(product)"><b-icon
                                    icon="trash"></b-icon></b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
                <b-col cols="3" class="my-auto">
                    <div><small><b>Unitario:</b> <span>{{ product.price | monetary }}</span></small></div>
                    <div><small><b>Total:</b> <span>{{ product.price * product.quantity | monetary }}</span></small></div>
                </b-col>
            </b-row>

            <b-row class="d-flex justify-content-end mx-0 my-2">
                <h2><b>Total: </b> <span>{{ totalPrice | monetary }}</span></h2>
            </b-row>

            <b-row>
                <b-col cols="6"><b-button block @click="removeAllItems" variant="secondary">Limpiar Carrito</b-button></b-col>
                <b-col cols="6"><b-button block variant="danger">Finalizar Compra</b-button></b-col>
            </b-row>
        </div>
        <div v-else>
            <b-alert show variant="light" style="width:250px">
                <span>El carrito esta vacío</span>
            </b-alert>
        </div>
    </div>
</template>


<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: "CartComponent",
    computed: {
        totalPrice() {
            return this.cartList.reduce((total, product) => total + Number(product.price) * product.quantity, 0);
        },
        ...mapState({
            cartList: state => state.cartModule.cart,
        })
    },
    filters: {
        monetary(value) {
            return `$${value.toFixed(2)}`;
        }
    },
    methods: {
        ...mapActions("cartModule", ["addItem", "subItem", "removeItem", "removeAllItems"]),
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