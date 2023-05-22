// createApp
const {createApp} = Vue;

createApp({
    data() {
        return {
            title: "Hello world from Vue :)",
            number0: 20,
            number1: 40,
            message0: "This is a message",
            message1: "<b>This is a message</b>",
            pictureUrl: "https://picsum.photos/200",
            alt: "Picture",
            count: 0,
            isOn: true,
            isOff: false,
        }
    },

    created() {
        this.calculationFunction();
    },

    methods: {
        calculationFunction() {
            let a = 20;
            let b = 20;
            console.log(a * b);
        },

        addFunction() {
            return this.number0 + this.number1;
        },

        addCount() {
            this.count++;
        }
    },

    computed: {
        addComputed() {
            return this.number0 + this.number1;
        }
    }
}).mount("#app")