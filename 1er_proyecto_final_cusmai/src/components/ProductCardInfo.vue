<template>
    <div>
        <p>{{ product.desc }}</p>
        <b-table small stacked :items="[product]" :fields="fields"></b-table>
    </div>
</template>


<script>
export default {
    name: "ProductCardInfo",
    props: {
        product: Object
    },
    data() {
        return {
            fields: [
                {
                    key: 'price',
                    label: 'Precio',
                    sortable: false,
                    variant: "secondary",
                    formatter: (val) => `$${val.toFixed(2)}`
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
    }
}
</script>