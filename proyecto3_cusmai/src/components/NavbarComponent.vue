<template>
    <b-navbar toggleable="lg" type="dark" variant="danger">
        <b-navbar-brand to="/">Tienda de juegos</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/">Clasicos</b-nav-item>
                <b-nav-item to="/">Euros</b-nav-item>
                <b-nav-item to="/">Party Games</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" variant="light" type="submit"><b-icon
                            icon="search"></b-icon></b-button>
                </b-nav-form>

                <b-nav-item-dropdown right v-if="logged">
                    <template #button-content>
                        <em>Cuenta</em> <b-icon icon="person"></b-icon>
                    </template>
                    <b-dropdown-item v-if="hasAdminRoles" to="/productmanagement">Gestión Productos</b-dropdown-item>
                    <b-dropdown-item v-if="hasAdminRoles" to="/usermanagement">Gestión Usuarios</b-dropdown-item>
                    <b-dropdown-item @click="logout">Salir</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item right to="/login" v-else>
                    <em>Ingresar</em> <b-icon icon="box-arrow-in-right"></b-icon>
                </b-nav-item>

                <b-nav-item right to="/cart">
                    <em>Carrito</em> <b-icon icon="cart"></b-icon> <b-badge pill variant="dark" v-show="cartQuantity">{{
                        cartQuantity }}</b-badge>
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>


<script>
const ADMIN = "admin";

export default {
    name: "TheNavbar",
    props: {
        cartList: Array,
    },
    computed: {
        cartQuantity() {
            return this.cartList.reduce((total, product) => total + product.quantity, 0);
        },
        logged() {
            return this.$route.params.user ? true : false;
        },
        user() {
            return this.$route.params.user;
        },
        hasAdminRoles() {
            return this.user?.roles?.some(rol => rol === ADMIN);
        }
    },
    methods: {
        login() {
            this.$router.push("login");
        },
        logout() {
            this.$emit("logout");
        }
    }
}
</script>