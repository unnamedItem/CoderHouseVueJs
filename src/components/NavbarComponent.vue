<template>
  <b-navbar toggleable="lg" type="dark" variant="danger">
    <b-navbar-brand to="/">Mercado de Juegos</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'Home', query: { tag: 'euro' } }"
          >Euros</b-nav-item
        >
        <b-nav-item :to="{ name: 'Home', query: { tag: 'party' } }"
          >Party Games</b-nav-item
        >
        <b-nav-item :to="{ name: 'Home', query: { tag: 'co-op' } }"
          >Co-Op</b-nav-item
        >
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto" @submit.prevent="handleSearch">
        <b-nav-form class="mr-3">
          <b-form-input
            size="sm"
            class="mr-sm-2"
            v-model="searchQuery"
            placeholder="Buscar"
          ></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" variant="light" type="submit"
            ><b-icon icon="search"></b-icon
          ></b-button>
        </b-nav-form>

        <b-nav-item-dropdown right v-if="logged">
          <template #button-content>
            <em>{{ user.username }}</em> <b-icon icon="person"></b-icon>
          </template>
          <b-dropdown-header v-if="hasAdminRoles">Gestión</b-dropdown-header>
          <b-dropdown-item v-if="hasAdminRoles" to="/productmanagement"
            >Productos</b-dropdown-item
          >
          <b-dropdown-item v-if="hasAdminRoles" to="/usermanagement"
            >Usuarios</b-dropdown-item
          >
          <b-dropdown-divider v-if="hasAdminRoles"></b-dropdown-divider>
          <b-dropdown-item to="/login" @click="logout">Salir</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item right to="/login" v-else>
          <em>Ingresar</em> <b-icon icon="box-arrow-in-right"></b-icon>
        </b-nav-item>

        <b-nav-item right to="/cart">
          <em>Carrito</em> <b-icon icon="cart"></b-icon>
          <b-badge pill variant="dark" v-show="cartQuantity">{{
            cartQuantity
          }}</b-badge>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>


<script>
import { mapActions, mapState } from "vuex";
const ADMIN = "admin";

export default {
  name: "TheNavbar",
  data() {
    return {
      searchQuery: "",
    };
  },
  computed: {
    ...mapState({
      cartList: (state) => state.cartModule.cart,
      user: (state) => state.accountModule.user,
      logged: (state) => state.accountModule.logged,
    }),
    cartQuantity() {
      return this.cartList.reduce(
        (total, product) => total + product.quantity,
        0
      );
    },
    hasAdminRoles() {
      return this.user?.roles?.some((rol) => rol === ADMIN);
    },
  },
  methods: {
    ...mapActions("accountModule", ["logout"]),
  },
};
</script>