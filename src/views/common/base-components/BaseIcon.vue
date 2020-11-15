<template>
  <vs-icon :icon="icon" :color="color" :size="size" @click="clickEvent">
    <slot></slot>
  </vs-icon>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseIcon',
  props: {
    color: { type: String },
    size: { type: String, default: '18px' },
  },
  data() {
    return {
      icon: '',
    };
  },
  created() {
    if (this.$slots.default) {
      const iconText = this.$slots.default[0].text || '';
      this.icon = iconText.trim();
    }
  },
  methods: {
    clickEvent(event: Event) {
      this.$emit('click', event);
    },
  },
});
</script>
