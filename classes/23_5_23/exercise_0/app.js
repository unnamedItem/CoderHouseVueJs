const {createApp} = Vue;

createApp({
    data() {
        return {
            show: true,
        }
    },

    methods: {
        showEvent() {
            this.show = !this.show;
        },
    }
}).mount("#app")