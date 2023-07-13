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
import { userService } from '../_services/user.service';
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
            userService.login(this.username, this.password)
                .then(() => { this.$router.push({name: "Home"}) })
                .catch((err) => { 
                    this.errors.push(err.message);
                    this.isSubmited = false;
                })
        },
    }
}
</script>