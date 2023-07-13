<template>
    <b-overlay :show="isLoading">
        <b-container>
            <h2 class="text-left">Gestión de Productos</h2>
            <b-table :items="products" :fields="fields" striped>
                <template #cell(img)="data">
                    <img :src="data.item.img" height="40px">
                </template>

                <template #cell(tags)="data">
                    <b-badge v-for="(tag, index) in data.item.tags" :key="index" variant="danger">{{ tag }}</b-badge>
                </template>
            </b-table>
        </b-container>
    </b-overlay>
</template>


<script>
const axios = require('axios')
const baseUrl = process.env.VUE_APP_MOCKAPI_URL;
const endpoint = baseUrl + '/products';
const ADMIN = "admin";

export default {
    data() {
        return {
            products: [],
            isLoading: true,
            fields: [
                {
                    key: "img",
                    label: "",
                    sortable: false,
                },
                {
                    key: "name",
                    label: "Nombre",
                    sortable: true,
                },
                {
                    key: "price",
                    label: "Precio",
                    sortable: true,
                    formatter: (val) => `$${val.toFixed(2)}`
                },
                {
                    key: "tags",
                    label: "Categorias",
                    sortable: true,
                },
            ]
        }
    },
    created() {
        const hasAdminRoles = this.$route.params.user?.roles?.some(rol => rol === ADMIN);
        if (!hasAdminRoles) {
            this.$router.push({ name: "Home", params: { user: this.$route.params.user } });
        } else {
            this.getProducts();
        }
    },
    methods: {
        getProducts() {
            axios.get(endpoint)
                .then((response) => {
                    this.products = response.data;
                    this.isLoading = false;
                })
                .catch((err) => { console.error(`${err}`) })
        }
    }
}
</script>