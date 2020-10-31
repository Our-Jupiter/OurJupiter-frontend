<template>
  <vs-input v-model="value" :label="label" :type="type" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseInput',
  model: {
    prop: 'modelValue',
  },
  props: {
    modelValue: { type: String, default: '' },
    label: { type: String, default: '' },
    type: { type: String, default: 'text' },
  },
  computed: {
    value: {
      get(): string {
        return this.modelValue;
      },
      set(newValue: string) {
        this.$emit('input', newValue);
      },
    },
  },
});
</script>

<style lang="scss" scoped>
::v-deep .vs-input {
  width: 100%;
}
::v-deep .vs-input-content {
  margin-top: 25px;
}
.vs-input-parent {
  margin: 10px;
}
</style>
