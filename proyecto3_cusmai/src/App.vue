<template>
  <div id="app">
    <TheNavbar/>
    <router-view id="router-view"/>
    <TheFooter/>
  </div>
</template>

<script>
import TheNavbar from './components/NavbarComponent.vue';
import TheFooter from './components/FooterComponent.vue';

export default {
  components: {
    TheFooter,
    TheNavbar,
  },
}
</script>

<style>
#router-view {
  padding-bottom: 130px;
  padding-top: 40px;
}
</style>
