<template>
    <b-container class="my-5">
        <b-alert v-for="(error, index) in errors" :key="index" :show="true" variant="danger">{{ error }}</b-alert>
        <b-form @submit.prevent="handleSubmit">
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
import { mapActions } from 'vuex';

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
        ...mapActions("accountModule", ["login"]),
        handleSubmit() {
            this.isSubmited = true;
            this.errors = [];
            const { username, password } = this;
            this.login({username, password})
                .then(() => { this.$router.push({name: "Home"}) })
                .catch((err) => { 
                    this.errors.push(err.message);
                    this.isSubmited = false;
                })
        },
    }
}
</script>