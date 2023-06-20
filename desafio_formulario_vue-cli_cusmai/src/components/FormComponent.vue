<template>
    <div class="my-2">
        <div class="my2" v-if="errors.length > 0">
            <b-alert show v-for="(error, index) in errors" :key="index" variant="danger">
                <span>{{ error }}</span>
            </b-alert>
        </div>

        <b-form @submit.prevent="onSubmit">
            <b-form-group
                id="fieldset-1"
                label="Nombre"
                label-for="name-input"
                :state="formState.name"
            >
                <b-form-input
                    id="name-input"
                    type="text"
                    required
                    v-model="form.name"
                    :state="formState.name"
                    trim
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="fieldset-2"
                label="DNI"
                label-for="dni-inpu"
                :state="formState.dni"
            >
                <b-form-input
                    id="dni-input"
                    type="number"
                    required
                    v-model="form.dni"
                    :state="formState.dni"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="fieldset-3"
                label="Email"
                label-for="email-input"
                :state="formState.email"
            >
                <b-form-input
                    id="email-input"
                    type="email"
                    required
                    v-model="form.email"
                    :state="formState.email"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="fieldset-4"
                label="Fecha del turno"
                label-for="date-input"
                :state="formState.date"
            >
                <b-form-input
                    id="date-input"
                    type="date"
                    required
                    v-model="form.date"
                    :state="formState.date"
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" class="my-2 mr-2">Añadir turno</b-button>
            <b-button @click="clearForm" variant="secondary" class="my-2">Limpiar formulario</b-button>
        </b-form>
    </div>
</template>


<script>
export default {
    name: "FormComponent",
    data() {
        return {
            form: {
                name: null,
                dni: null,
                email: null,
                date: null,
            },
            formState: {
                name: null,
                dni: null,
                email: null,
                date: null,
            },
            errors: []
        }
    },
    methods: {
        onSubmit() {
            this.errors = [];
            const isValid = this.validateDni(this.form.dni);
            if (isValid) {
                let formCopy = JSON.parse(JSON.stringify(this.form));
                this.$emit("submit", formCopy);
                this.clearForm();
            }
        },
        clearForm() {
            this.errors = [];
            Object.keys(this.form).forEach(key => this.form[key] = null);
            Object.keys(this.formState).forEach(key => this.formState[key] = null);
        },
        validateDni(dni) {
            if (dni) {
                const isValidDni = Number(dni).toString().length === 8;
                this.formState.dni = isValidDni;
                !isValidDni && this.errors.push("No es un DNI valido");
                return isValidDni;
            } else {
                this.formState.dni = null;
                return true;
            }
        }
    },
}
</script>