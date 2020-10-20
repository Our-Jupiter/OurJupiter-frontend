<template>
  <vs-button :color="color" @click="clickEvent">
    <slot></slot>
  </vs-button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseButton',
  props: {
    color: { type: String, required: false },
  },
  methods: {
    clickEvent(event: Event) {
      this.$emit('click', event);
    },
  },
});
</script>
