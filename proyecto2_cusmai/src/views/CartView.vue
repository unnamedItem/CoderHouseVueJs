<template>
    <b-container>
        <CartComponent :cartList="[]" @addItem="addItem($event)" @subItem="subItem($event)"
            @removeItem="removeItem($event)" />
    </b-container>
</template>


<script>
import CartComponent from '../components/CartComponent.vue';

export default {
    components: {
        CartComponent,
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
    }
}
</script>