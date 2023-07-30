<template>
    <b-overlay :show="!products.length">
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
import { mapState } from 'vuex'
export default {
    data() {
        return {
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
    computed: {
        ...mapState({
            products: state => state.productModule.products,
        })
    }
}
</script>