<template>
  <b-container>
    <h2 class="text-left">Nuevo Producto</h2>
    <b-overlay :show="isLoading">
      <ManagementForm
        @submit="handleSubmit"
        :key="isLoading"
        :fields="fields"
        :data="product"
      ></ManagementForm>
    </b-overlay>
  </b-container>
</template>


<script>
import { productService } from "@/_services/product.service";
import ManagementForm from "@/components/ManagementForm.vue";
import { mapActions } from "vuex";

export default {
  components: {
    ManagementForm,
  },
  props: {
    id: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      product: {},
      isLoading: true,
      fields: [
        {
          type: "text",
          key: "name",
          label: "Nombre",
          required: true,
        },
        {
          type: "url",
          key: "img",
          label: "URL Imagen",
          required: true,
        },
        {
          type: "number",
          key: "price",
          required: true,
        },
        {
          type: "textarea",
          key: "desc",
          required: true,
        },
        {
          type: "number",
          key: "quantity",
          required: true,
        },
        {
          type: "number",
          key: "gameTime",
          required: true,
        },
        {
          type: "number",
          key: "maxPlayers",
          required: true,
        },
        {
          type: "number",
          key: "minPlayers",
          required: true,
        },
        {
          type: "tags",
          key: "tags",
          required: true,
        },
      ],
    };
  },
  created() {
    if (this.id === "add") {
      this.isLoading = false;
    } else {
      this.getProduct();
    }
  },
  methods: {
    ...mapActions("productModule", ["addProduct", "updateProduct"]),
    getProduct() {
      productService
        .getProductById(this.id)
        .then((product) => {
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
        });
    },
    handleSubmit(product) {
      if (this.id === "add") {
        this.addProduct(product).then(() => {
          this.$router.push({ name: "ProductManagement" });
        });
      } else {
        this.updateProduct(product).then(() => {
          this.$router.push({ name: "ProductManagement" });
        });
      }
    },
  },
};
</script>