<template>
  <b-container>
    <h2 class="text-left">Nuevo Usuario</h2>
    <b-overlay :show="isLoading">
      <ManagementForm
        @submit="handleSubmit"
        :key="isLoading"
        :fields="fields"
        :data="user"
      ></ManagementForm>
    </b-overlay>
  </b-container>
</template>
  
  
  <script>
import ManagementForm from "@/components/ManagementForm.vue";
import { userService } from "@/_services/user.service";

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
      user: {},
      isLoading: true,
      fields: [
        {
          type: "text",
          key: "username",
          label: "Nombre de Usuario",
          required: true,
        },
        {
          type: "password",
          key: "password",
          label: "Contraseña",
          required: true,
        },
        {
          type: "text",
          key: "phone",
          label: "Número de Telefono",
          required: true,
        },
        {
          type: "email",
          key: "email",
          label: "Email",
          required: true,
        },
        {
          type: "tags",
          key: "roles",
          label: "Roles",
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
    getProduct() {
      userService
        .getUserById(this.id)
        .then((user) => {
          if (user) {
            this.user = user;
            this.isLoading = false;
          } else {
            throw new Error("No se encontró el usuario");
          }
        })
        .catch((err) => {
          console.error(`${err}`);
          this.$router.push({ path: "/" });
        });
    },
    handleSubmit(user) {
      if (this.id === "add") {
        userService.singIn(user).then((user) => {
          if (user) {
            userService.createUserCart(user.id).then(() => {
              this.$router.push({ name: "UserManagement" });
            });
          }
        });
      } else {
        userService.updateUser(user).then(() => {
          this.$router.push({ name: "UserManagement" });
        });
      }
    },
  },
};
</script>