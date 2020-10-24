<template>
  <vs-checkbox :val="checkedValue" v-model="value">
    {{ label }}
  </vs-checkbox>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseCheckBox',
  model: {
    prop: 'modelValue',
  },
  props: {
    modelValue: { default: false },
    label: { type: String, default: '' },
    checkedValue: { type: String, default: 'checked' },
  },
  computed: {
    value: {
      get(): any {
        return this.modelValue;
      },
      set(newValue: boolean) {
        this.$emit('input', newValue);
      },
    },
  },
});
</script>
