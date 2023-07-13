<template>
    <b-container class="my-5">
        <b-alert v-for="(error, index) in errors" :key="index" :show="true" variant="danger">{{ error }}</b-alert>
        <b-form @submit.prevent="login">
            <b-form-group label="Username" label-for="username-input">
                <b-input id="username-input" type="text" v-model="username" placeholder="username" required
                    :disabled="isSubmited"></b-input>
            </b-form-group>

            <b-form-group label="Password" label-for="password-input">
                <b-input id="password-input" type="password" v-model="password" placeholder="password" required
                    :disabled="isSubmited"></b-input>
            </b-form-group>

            <small><b-link to="/singin">¿No tienes cuenta?</b-link></small>

            <b-button class="mt-2" block type="submit" variant="danger" :disabled="isSubmited">Login</b-button>
        </b-form>
    </b-container>
</template>


<script>
const axios = require('axios')
const baseUrl = process.env.VUE_APP_MOCKAPI_URL;
const endpoint = baseUrl + '/users';

export default {
    data() {
        return {
            username: "admin",
            password: "admin123",
            errors: [],
            isSubmited: false,
        }
    },
    methods: {
        login() {
            this.isSubmited = true;
            this.errors = [];
            axios.get(endpoint)
                .then((response) => {
                    const users = response.data;
                    const user = users.find(usr => usr.username === this.username && usr.password === this.password);
                    if (user) {
                        localStorage.setItem("user", JSON.stringify(user));
                        this.$router.push({name: "Home", params: { user: user ? user : null }});
                    } else {
                        this.errors.push("Usuario o contraseña equivocados");
                    }
                    this.isSubmited = false;
                })
                .catch((err) => { 
                    console.error(`${err}`);
                    this.isSubmited = true;
                })
        },
    }
}
</script>