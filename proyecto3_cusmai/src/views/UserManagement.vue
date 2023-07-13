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
import { userService } from '../_services/user.service';

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
        this.getUsers();
    },
    methods: {
        getUsers() {
            userService.getAllUsers()
                .then((response) => {
                    this.usersList = response;
                    this.isLoading = false;
                })
                .catch((err) => { console.error(`${err}`) })
        }
    }
}
</script>