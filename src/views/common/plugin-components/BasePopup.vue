<template>
  <vs-dialog v-model="isOpen" :prevent-close="preventClose">
    <component :is="popupComponent" :popupData="popupData"></component>
  </vs-dialog>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BasePopup',
  computed: {
    isOpen: {
      get(): boolean {
        return this.$store.state.popup.isOpen;
      },
      set(newValue: boolean) {
        if (newValue === false) {
          this.$store.commit('popup/close');
        }
      },
    },
    preventClose(): boolean {
      return this.$store.state.popup.preventClose;
    },
    popupComponent(): any {
      return this.$store.state.popup.component;
    },
    popupData(): any {
      return this.$store.state.popup.data;
    },
  },
});
</script>
