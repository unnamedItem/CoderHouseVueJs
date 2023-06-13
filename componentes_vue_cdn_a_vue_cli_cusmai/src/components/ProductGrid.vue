<template>
  <table :class="[styles, color]">
    <thead>
        <tr>
            <th scope="col">Producto</th>
            <th scope="col">Precio</th>
            <th scope="col">Stock</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(item, index) of products" :key="index">
            <td>{{item.name}}</td>
            <td>{{item.price}}</td>
            <td>{{item.quantity}}</td>
        </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ProductGrid',
  props: {
    products: Array,
    styles: String,
    color: String
  },
}
</script>