<template>
    <b-container>
        <b-overlay :show="isLoading">
            <img class="mb-4" :src="product.img">
            <b-row cols="d-flex justify-content-center">
                <h4 class="my-auto">{{ product.name }}</h4>
                <b-button @click="addToCart" class="ml-4 my-auto" variant="danger"><b-icon icon="cart"></b-icon></b-button>
            </b-row>
            <hr>
            <p>{{ product.desc }}</p>
            <b-table small stacked :items="[product]" :fields="fields"></b-table>
        </b-overlay>
    </b-container>
</template>


<script>
import { productService } from '@/_services/product.service';

export default {
    data() {
        return {
            product: {},
            isLoading: true,
            fields: [
                {
                    key: 'price',
                    label: 'Precio',
                    sortable: false,
                    variant: "secondary",
                    formatter: (val) => `$${(val || 0).toFixed(2)}`
                },
                {
                    key: 'maxPlayers',
                    label: 'Max. Jugadores',
                    sortable: false,
                },
                {
                    key: 'minPlayers',
                    label: 'Min. Jugadores',
                    sortable: false,
                    variant: "secondary",
                },
                {
                    key: 'gameTime',
                    label: 'Duración',
                    sortable: false,
                    formatter: (val) => `${val} minutos`
                },
            ]
        }
    },
    props: {
        id: String
    },
    created() {
        this.getProduct();
    },
    methods: {
        getProduct() {
            productService.getProductById(this.id)
                .then(product => {
                    if (product) {
                        this.product = product;
                        this.isLoading = false;
                    } else {
                        throw new Error("No se encontró el producto");
                    }
                })
                .catch((err) => { 
                    console.error(`${err}`);
                    this.$router.push({ path: "/" });
                })
        },
        addToCart() {
            this.$emit("addToCart", this.product.id);
        },
    }
}
</script>