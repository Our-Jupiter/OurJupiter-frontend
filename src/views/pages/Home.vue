<template>
  <div class="home">
    Home
    <BaseButton @click="openPopup">popup</BaseButton>
    <BaseButton @click="openConfirm">confirm</BaseButton>
    <BaseCard title="Pot with a plant" :img="img" text="hi this is text" />
    <BaseAvatar :img="img" />
    <BaseCheckBox v-model="checkbox" label="hello" checkedValue="hello" />
    {{ checkbox }}
    <BaseInput v-model="input" label="text input" />
    {{ input }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Login from './auth/Login.vue';

export default Vue.extend({
  name: 'Home',
  data() {
    return {
      img: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png',
      checkbox: null,
      input: '',
    };
  },
  methods: {
    openPopup() {
      this.$popup.open({ component: Login });
    },
    openConfirm() {
      this.$confirm('Really ?');
    },
  },
});
</script>
