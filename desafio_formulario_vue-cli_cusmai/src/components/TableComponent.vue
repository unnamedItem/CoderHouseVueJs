<template>
    <div class="my-2">
        <div v-if="items.length > 0">
            <b-table
                :items="items"
                :fields="fields"
                striped
            ></b-table>

            <b-button variant="danger" @click="clearTable">Borrar todos los turnos</b-button>
        </div>

        <b-alert show v-else>
            <span>No hay turnos</span>
        </b-alert>
    </div>
</template>


<script>
export default {
    name: "TableComponent",
    props: {
        items: Array
    },
    data() {
        return {
            fields: [
                {
                    key: "name",
                    label: "Nombre",
                    sortable: false,
                },
                {
                    key: "dni",
                    label: "DNI",
                    sortable: false,
                },
                {
                    key: "email",
                    label: "Email",
                    sortable: false,
                },
                {
                    key: "date",
                    label: "Fecha del turno",
                    sortable: false,
                },
            ]
        }
    },
    methods: {
        clearTable() {
            this.$emit("clearTable");
        }
    }
}
</script>