<template>
  <vs-card>
    <template #title>
      <h3>{{ title }}</h3>
    </template>
    <template #img>
      <img :src="img" alt />
    </template>
    <template #text>
      <p>{{ text }}</p>
    </template>
    <template #interactions>
      <vs-button danger icon @click="clickEvent">
        <i class="material-icons">favorite</i>
      </vs-button>
    </template>
  </vs-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseCard',
  props: {
    title: { type: String, default: '', required: true },
    text: { type: String, default: '' },
    img: { type: String, default: '', required: true },
  },
  methods: {
    clickEvent(event: Event) {
      this.$emit('click', event);
    },
  },
});
</script>
