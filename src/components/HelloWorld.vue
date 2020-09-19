<template>
  <div class="hello">Hello World</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HelloWorld",
  props: {
    msg: String
  }
});
</script>
