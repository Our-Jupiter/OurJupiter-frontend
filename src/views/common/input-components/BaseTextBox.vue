<template>
  <vs-textarea
    v-model="value"
    :disabled="disabled"
    :readonly="readonly"
    :label="label"
    :placeholder="placeholder"
    :counter="max"
  ></vs-textarea>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseTextBox',
  model: {
    prop: 'modelValue',
  },
  props: {
    modelValue: { type: String, default: '' },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    max: { type: Number },
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
.vs-con-textarea {
  margin: 10px;
  padding: 3px;
}
</style>