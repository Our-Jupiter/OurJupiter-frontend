<template>
  <div class="about">
    <h1>This is login page</h1>
    <BaseCard title="Pot with a plant" :img="img" text="hi this is text" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      img: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png',
    };
  },
});
</script>
