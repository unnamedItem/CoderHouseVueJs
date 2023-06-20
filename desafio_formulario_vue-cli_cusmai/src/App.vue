<template>
  <div id="app" class="container my-5">
    <h3>Gestión de turnos</h3>
    <FormComponent @submit="addTurn($event)"></FormComponent>
    <hr>
    <h3>Turnos</h3>
    <TableComponent :items="turns" @clearTable="clearTable"></TableComponent>
  </div>
</template>

<script>
import FormComponent from './components/FormComponent.vue';
import TableComponent from './components/TableComponent.vue';

export default {
  name: 'App',
  components: {
    FormComponent,
    TableComponent
  },
  data() {
    return {
      turns: [],
    }
  },
  methods: {
    addTurn(newTurn) {
      this.turns.push(newTurn);
    },
    clearTable() {
      this.turns = [];
    }
  }
}
</script>
