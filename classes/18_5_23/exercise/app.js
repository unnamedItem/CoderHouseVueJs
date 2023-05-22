// createApp
const {createApp} = Vue;

createApp({
    data() {
        return {
            mainTitle: "Welcome",
            firstName: "Jhon",
            lastName: "Doe",
            number0: 0,
            number1: 0,
            result: 0,
        }
    },

    created() {
        this.isCreated();
    },

    methods: {
        isCreated() {
            console.log("[app was created]");
        },

        addFunction() {
            this.result = this.number0 + this.number1;
        },

        cleanResult() {
            this.result = 0;
        }
    },

    computed: {
        greating() {
            return `Hello ${this.firstName} ${this.lastName} nice to meet you.`;
        }
    }
}).mount("#app")