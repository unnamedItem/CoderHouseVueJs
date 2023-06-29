<template>
    <b-navbar toggleable="lg" type="dark" variant="danger">
        <b-navbar-brand href="#">Tienda de juegos</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item href="#">Clasicos</b-nav-item>
            <b-nav-item href="#">Euros</b-nav-item>
            <b-nav-item href="#">Party Games</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
            <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" variant="light" type="submit"><b-icon icon="search"></b-icon></b-button>
            </b-nav-form>

            <b-nav-item-dropdown right v-if="logged">
                <template #button-content>
                    <em>Cuenta</em> <b-icon icon="person"></b-icon>
                </template>
                <b-dropdown-item href="#">Perfil</b-dropdown-item>
                <b-dropdown-item @click="logout">Salir</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right v-else>
                <template #button-content>
                    <em>Ingresar</em> <b-icon icon="box-arrow-in-right"></b-icon>
                </template>
                <b-dropdown-form style="min-width: 250px">
                    <b-form-group label="Usuario" label-for="dropdown-form-email" @submit.stop.prevent>
                    <b-form-input
                        id="dropdown-form-email"
                        size="sm"
                        placeholder="user"
                        v-model="username"
                    ></b-form-input>
                    </b-form-group>

                    <b-form-group label="Contraseña" label-for="dropdown-form-password">
                    <b-form-input
                        id="dropdown-form-password"
                        type="password"
                        size="sm"
                        placeholder="123"
                        v-model="password"
                    ></b-form-input>
                    </b-form-group>

                    <b-button variant="primary" @click="login" size="sm">Ingresar</b-button>
                </b-dropdown-form>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item-button>Registrarse</b-dropdown-item-button>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
                <template #button-content>
                    <em>Carrito</em> <b-icon icon="cart"></b-icon>
                </template>
                
                <CartComponent :cartList="cartList" @addItem="addItem($event)" @subItem="subItem($event)" @removeItem="removeItem($event)" class="px-2"/>
            </b-nav-item-dropdown>
        </b-navbar-nav>
        </b-collapse>
  </b-navbar>
</template>


<script>
import CartComponent from './CartComponent.vue';

export default {
    name: "TheNavbar",
    components: {
        CartComponent,
    },
    props: {
        cartList: Array
    },
    data() {
        return {
            logged: false,
            username: "",
            password: "",
        }
    },
    methods: {
        addItem(id) {
            this.$emit("addItem", id);
        },
        subItem(id) {
            this.$emit("subItem", id);
        },
        removeItem(id) {
            this.$emit("removeItem", id);
        },
        login() {
            let user = JSON.parse(localStorage.getItem(this.username));
            if (!user) {
                alert("El usuario no existe");
            } else {
                if (user.password === this.password) {
                    this.logged = true;
                } else {
                    alert("Contraseña equivocada");
                }
            }
        },
        logout() {
            this.logged = false;
        }
    }
}
</script>