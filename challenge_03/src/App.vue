<template>
  <div id="app" class="container p-5">
    <h2>Juegos de Mesa</h2>
        <hr>
        <div>
            <h3>Clasicos</h3>
            <product-grid :products="data0" :styles="'table table-danger'" :color="'text-danger'"></product-grid>
        </div>
        <div>
            <h3>Euros</h3>
            <product-grid :products="data1" :styles="'table table-success'" :color="'text-success'"></product-grid>
        </div>
        <div>
            <h3>Party Games</h3>
            <product-grid :products="data2" :styles="'table table-info'" :color="'text-info'"></product-grid>
        </div>
  </div>
</template>

<script>
import ProductGrid from './components/ProductGrid.vue'

export default {
  name: 'App',
  components: {
    ProductGrid
  },
  data() {
    return {
        data0: [
            {
                "price": "$224.84",
                "quantity": 75,
                "name": "Teg"
            },
            {
                "price": "$998.71",
                "quantity": 37,
                "name": "Monopoly"
            },
            {
                "price": "$221.23",
                "quantity": 18,
                "name": "Ludo"
            },
        ],
        data1: [
            {
                "price": "$25.03",
                "quantity": 7,
                "name": "Catan"
            },
            {
                "price": "$421.00",
                "quantity": 96,
                "name": "Carcassonne"
            },
            {
                "price": "$683.90",
                "quantity": 30,
                "name": "Aventureros al Tren"
            },
        ],
        data2: [
            {
                "price": "$931.01",
                "quantity": 29,
                "name": "Say My Name"
            },
            {
                "price": "$919.31",
                "quantity": 66,
                "name": "Pictomania"
            },
            {
                "price": "$64.69",
                "quantity": 60,
                "name": "The Mind"
            },
        ]
    }
  }
}
</script>
