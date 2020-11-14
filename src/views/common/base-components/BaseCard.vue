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
      <vs-button v-if="favorite" danger icon @click="clickEvent">
        <i class="material-icons">favorite</i>
      </vs-button>
      <slot name="interaction"></slot>
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
    img: { type: String, default: require('@/assets/logo.png') },
    favorite: { type: Boolean, default: false },
  },
  methods: {
    clickEvent(event: Event) {
      this.$emit('click', event);
    },
  },
});
</script>
