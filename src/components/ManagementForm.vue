<template>
  <b-container>
    <b-form @submit.prevent="handleSubmit">
      <b-form-group
        v-for="(field, index) in fields"
        :key="index"
        :label="field.label || capitalizeEveryWord(field.key)"
        :label-for="`${field.key}-input`"
      >
        <b-form-tags
          v-if="field.type === 'tags'"
          :id="`${field.key}-input`"
          v-model="payload[field.key]"
        ></b-form-tags>

        <b-form-textarea
          v-else-if="field.type === 'textarea'"
          :id="`${field.key}-input`"
          v-model="payload[field.key]"
          :placeholder="field.placeholder"
          rows="3"
          max-rows="6"
        ></b-form-textarea>

        <b-input
          v-else
          :id="`${field.key}-input`"
          :type="field.type || 'text'"
          v-model="payload[field.key]"
          :placeholder="field.placeholder"
          :required="field.required || false"
          :disabled="isSubmited"
        ></b-input>
      </b-form-group>

      <b-button
        class="mt-2"
        block
        type="submit"
        variant="danger"
        :disabled="isSubmited"
        >Enviar</b-button
      >
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: "ManagementForm",
  props: {
    fields: Array,
    data: {
      type: Object,
      required: false,
      deafult: null,
    },
  },
  data() {
    return {
      payload: {},
      isSubmited: false,
    };
  },
  created() {
    Object.keys(this.data).forEach((key) => {
      this.payload[key] = this.data[key];
    });
  },
  methods: {
    handleSubmit() {
      this.fields.forEach((field) => {
        if (field.type === "number") {
          this.payload[field.key] = parseFloat(this.payload[field.key]);
        }
      });
      this.$emit("submit", this.payload);
    },
    capitalizeEveryWord(str) {
      return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },
  },
};
</script>