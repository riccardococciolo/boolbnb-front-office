<script>

import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';

  export default {
    data() {
      return {
        address: ''
      }
    },
    components: { AppHeader, AppFooter }
  }
</script>

<template>
  <AppHeader />

  <router-view></router-view>

  <AppFooter />
</template>

<style lang="scss">
  @use "./styles/general.scss" as *;
  @import "@fortawesome/fontawesome-free/css/all.css";
</style>