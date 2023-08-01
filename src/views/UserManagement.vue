<template>
  <b-overlay :show="isLoading">
    <b-container>
      <h2 class="text-left">Gestión de Usuarios</h2>
      <b-table :items="usersList" :fields="fields" striped>
        <template #cell(roles)="data">
          <b-badge
            v-for="(rol, index) in data.item.roles"
            :key="index"
            variant="danger"
            >{{ rol }}</b-badge
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

      <b-button @click="handleAddUser" variant="danger" block
        >Añadir usuario</b-button
      >
    </b-container>
  </b-overlay>
</template>


<script>
import { mapActions, mapState } from "vuex";
import { userService } from "../_services/user.service";

export default {
  data() {
    return {
      usersList: [],
      isLoading: true,
      fields: [
        {
          key: "username",
          label: "Nombre de usuarios",
        },
        {
          key: "email",
          label: "Email",
        },
        {
          key: "phone",
          label: "Número de telefono",
        },
        {
          key: "roles",
          label: "Roles",
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
        user: state => state.accountModule.user
    })
  },
  created() {
    this.getUsers();
  },
  methods: {
    ...mapActions("accountModule", ["logout"]),
    getUsers() {
      userService
        .getAllUsers()
        .then((response) => {
          this.usersList = response;
          this.isLoading = false;
        })
        .catch((err) => {
          console.error(`${err}`);
        });
    },
    handleDelete(user) {
      this.$bvModal
        .msgBoxConfirm("¿Está seguro de que quiere borrar este usuario?", {
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
            userService.deleteUser(user).then((usr) => {
              if (usr.id === this.user.id) {
                this.logout();
                this.$router.push("/login");
              } else {
                this.getUsers();
              }
            });
          }
        });
    },
    handleEdit(user) {
      this.$router.push({ path: `/usermanagement/form/${user.id}` });
    },
    handleAddUser() {
      this.$router.push({ path: `/usermanagement/form/add` });
    },
  },
};
</script>