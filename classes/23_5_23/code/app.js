const {createApp} = Vue;

createApp({
    data() {
        return {
            title: "Conditional directives, structural and attribute",
            show: false,
            data: ["a", "b", "c"],
            dangerMsg: "bg-danger p-3 my-1",
            successMsg: "bg-success p-3 my-1",
            infoMsg: "bg-info p-3 my-1",
            textLight: "text-light",
            showClass: true,
        }
    },

    methods: {
        showEvent() {
            this.show = true;
        },

        hideEvent() {
            this.show = false;
        },

        showClassEvent() {
            this.showClass = !this.showClass;
        }
    }
}).mount("#app")