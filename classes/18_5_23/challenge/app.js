const {createApp} = Vue;

createApp({
    data() {
        return {
            count: 0
        }
    },

    methods: {
        addCount() {
            this.count++;
        },

        subCount() {
            this.count--;
        }
    },
}).mount("#app")