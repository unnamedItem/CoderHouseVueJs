const {createApp} = Vue;

createApp({
    data() {
        return {
            contacts: [],
        }
    },

    created() {
        this.getData();
    },

    methods: {
        getData() {
            this.contacts = data;
        },
    }
}).mount("#app")