<template>
    <b-overlay :show="isLoading">
        <b-container>
            <h2 class="text-left">Gestión de Usuarios</h2>
            <b-table :items="usersList" :fields="fields">
                <template #cell(roles)="data">
                    <b-badge v-for="(rol, index) in data.item.roles" :key="index" variant="danger">{{ rol }}</b-badge>
                </template>
            </b-table>
        </b-container>
    </b-overlay>
</template>


<script>
const axios = require('axios')
const baseUrl = process.env.VUE_APP_MOCKAPI_URL;
const endpoint = baseUrl + '/users';
const ADMIN = "admin";

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
                    label: "Roles"
                }
            ]
        }
    },
    created() {
        const hasAdminRoles = this.$route.params.user?.roles?.some(rol => rol === ADMIN);
        if (!hasAdminRoles) {
            this.$router.push({ name: "Home", params: { user: this.$route.params.user } });
        } else {
            this.getUsers();
        }
    },
    methods: {
        getUsers() {
            axios.get(endpoint)
                .then((response) => {
                    this.usersList = response.data;
                    this.isLoading = false;
                })
                .catch((err) => { console.error(`${err}`) })
        }
    }
}
</script>