<template>
    <b-container>
        <CartComponent :cartList="cartList" @addItem="addItem($event)" @subItem="subItem($event)"
            @removeAllItems="removeAllItems($event)" @removeItem="removeItem($event)" />
    </b-container>
</template>


<script>
import CartComponent from '../components/CartComponent.vue';

export default {
    components: {
        CartComponent,
    },
    props: {
        cartList: Array,
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
        },
        removeAllItems() {
            this.$emit("removeAllItems");
        }
    }
}
</script>