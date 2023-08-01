<template>
  <b-overlay :show="!products.length">
    <b-container>
      <h2 class="text-left">Gestión de Productos</h2>
      <b-table :items="products" :fields="fields" striped>
        <template #cell(img)="data">
          <img :src="data.item.img" height="40px" />
        </template>

        <template #cell(tags)="data">
          <b-badge
            v-for="(tag, index) in data.item.tags"
            :key="index"
            variant="danger"
            >{{ tag }}</b-badge
          >
        </template>

        <template #cell(button-edit)="data">
          <b-button @click="handleEdit(data.item)">
            <b-icon icon="pen"></b-icon>
          </b-button>
        </template>

        <template #cell(button-delete)="data">
          <b-button @click="handleDelete(data.item)" variant="danger">
            <b-icon icon="trash"></b-icon>
          </b-button>
        </template>
      </b-table>

      <b-button @click="handleAddProduct" variant="danger" block
        >Añadir producto</b-button
      >
    </b-container>
  </b-overlay>
</template>


<script>
import { mapActions, mapState } from "vuex";
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
          formatter: (val) => `$${val.toFixed(2)}`,
        },
        {
          key: "quantity",
          label: "Stock",
          sortable: true,
        },
        {
          key: "tags",
          label: "Categorias",
          sortable: true,
        },
        {
          key: "button-edit",
          label: "",
          sortable: false,
        },
        {
          key: "button-delete",
          label: "",
          sortable: false,
        },
      ],
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.productModule.products,
    }),
  },
  methods: {
    ...mapActions("productModule", ["deleteProduct"]),
    handleDelete(product) {
      this.$bvModal
        .msgBoxConfirm("¿Está seguro de que quiere borrar este producto?", {
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Si",
          cancelTitle: "No",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.deleteProduct(product);
          }
        });
    },
    handleEdit(product) {
      this.$router.push({ path: `/productmanagement/form/${product.id}` });
    },
    handleAddProduct() {
      this.$router.push({ path: `/productmanagement/form/add` });
    },
  },
};
</script>