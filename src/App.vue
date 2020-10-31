<template>
  <div id="app">
    <router-view />
    <BasePopup />
    <BaseConfirm />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  created() {
    if (localStorage.getItem('token') !== null) {
      this.$store.dispatch('me/putMe');
    }
  },
});
</script>