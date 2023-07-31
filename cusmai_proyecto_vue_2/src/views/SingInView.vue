<template>
    <b-container class="my-5">
        <b-alert v-for="(error, index) in errors" :key="index" :show="true" variant="danger">{{ error }}</b-alert>
        <b-form @submit.prevent="handleSubmit">
            <b-form-group label="Username" label-for="username-input">
                <b-input id="username-input" type="text" v-model="form.username" placeholder="username" required
                    :disabled="isSubmited"></b-input>
            </b-form-group>

            <b-form-group label="Password" label-for="password-input">
                <b-input id="password-input" type="password" v-model="form.password" placeholder="password" required
                    :disabled="isSubmited"></b-input>
            </b-form-group>

            <b-form-group label="Email" label-for="email-input">
                <b-input id="email-input" type="email" v-model="form.email" placeholder="email" required
                    :disabled="isSubmited"></b-input>
            </b-form-group>

            <small><b-link to="/login">¿Ya tienes cuenta?</b-link></small>

            <b-button class="mt-2" block type="submit" variant="danger" :disabled="isSubmited">Regristrase</b-button>
        </b-form>
    </b-container>
</template>


<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            errors: [],
            isSubmited: false,
            form: {
                username: "",
                password: "",
                email: "",
                roles: ["user"],
            }
        }
    },
    methods: {
        ...mapActions("accountModule", ["singIn"]),
        handleSubmit() {
            this.isSubmited = true;
            this.singIn(this.form)
                .then(() => { this.$router.push({name: "Home"}) })
                .catch((err) => { 
                    this.errors.push(err.message);
                    this.isSubmited = false;
                })
        },
    }
}
</script>