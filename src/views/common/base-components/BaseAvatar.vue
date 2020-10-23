<template>
  <vs-avatar size="60">
    <img v-if="img" class="avatar-img" :src="img" alt="" @click="clickEvent" />
    <i v-else class="material-icons">person</i>
  </vs-avatar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseAvatar',
  props: {
    img: { type: String, required: false },
  },
  methods: {
    clickEvent(event: Event) {
      this.$emit('click', event);
    },
  },
});
</script>

<style lang="scss" scoped>
.avatar-img {
  cursor: pointer;
}
</style>