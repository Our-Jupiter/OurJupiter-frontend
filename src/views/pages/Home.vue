<template>
  <div class="home">
    Home
    <BaseButton @click="openDialog">Button</BaseButton>
    <BaseCard title="Pot with a plant" :img="img" text="hi this is text" />
    <BaseAvatar :img="img" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Login from './Login.vue';

export default Vue.extend({
  name: 'Home',
  data() {
    return {
      img: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png',
    };
  },
  methods: {
    openDialog() {
      this.$popup.open({ component: Login });
    },
  },
});
</script>
