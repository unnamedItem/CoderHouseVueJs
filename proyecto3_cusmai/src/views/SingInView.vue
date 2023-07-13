<template>
    <b-container class="my-5">
        <b-alert v-for="(error, index) in errors" :key="index" :show="true" variant="danger">{{ error }}</b-alert>
        <b-form @submit.prevent="singIn">
            <b-form-group label="Username" label-for="username-input">
                <b-input id="username-input" type="text" v-model="username" placeholder="username" required
                    :disabled="isSubmited"></b-input>
            </b-form-group>

            <b-form-group label="Password" label-for="password-input">
                <b-input id="password-input" type="password" v-model="password" placeholder="password" required
                    :disabled="isSubmited"></b-input>
            </b-form-group>

            <b-form-group label="Email" label-for="email-input">
                <b-input id="email-input" type="email" v-model="email" placeholder="email" required
                    :disabled="isSubmited"></b-input>
            </b-form-group>

            <small><b-link to="/login">¿Ya tienes cuenta?</b-link></small>

            <b-button class="mt-2" block type="submit" variant="danger" :disabled="isSubmited">Regristrase</b-button>
        </b-form>
    </b-container>
</template>


<script>
const axios = require('axios')
const baseUrl = process.env.VUE_APP_MOCKAPI_URL;
const endpoint = baseUrl + '/users';
const roles = ["user"];

export default {
    data() {
        return {
            username: "",
            password: "",
            email: "",
            errors: [],
            isSubmited: false,
        }
    },
    methods: {
        singIn() {
            this.isSubmited = true;
            axios.post(endpoint, { username: this.username, password: this.password, email: this.email, roles: roles })
                .then((response) => {
                    const user = response.data;
                    if (user) {
                        localStorage.setItem("user", JSON.stringify(user));
                        this.$router.push("/");
                    } else {
                        this.errors.push("No se pudo completar el registro");
                    }
                })
                .catch((err) => { console.error(`${err}`) })
        },
    }
}
</script>