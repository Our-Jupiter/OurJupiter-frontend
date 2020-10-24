<template>
  <vs-dialog v-model="isOpen" prevent-close>
    {{ text }}
    <template #footer>
      <div class="confirm-footer">
        <BaseButton @click="cancel">Cancel</BaseButton>
        <BaseButton @click="ok">Ok</BaseButton>
      </div>
    </template>
  </vs-dialog>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseConfirm',
  computed: {
    isOpen: {
      get(): boolean {
        return this.$store.state.confirm.isOpen;
      },
      set(newValue: boolean) {
        if (newValue === false) {
          this.$store.commit('confirm/cancel');
        }
      },
    },
    text() {
      return this.$store.state.confirm.text;
    },
  },
  methods: {
    ok() {
      this.$store.commit('confirm/ok');
    },
    cancel() {
      this.$store.commit('confirm/cancel');
    },
  },
});
</script>

<style lang="scss" scoped>
::v-deep .vs-dialog {
  padding: 20px;
}
.confirm-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
