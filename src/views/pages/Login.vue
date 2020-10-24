<template>
  <div class="login">
    <img class="logo" src="@/assets/logo.png" alt="main_logo" />
    <BaseButton @click="login">Login to 아워목성</BaseButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Login',
  methods: {
    login() {
      window.location.href =
        'https://localhost:8080/oauth2/authorization/google';
    },
  },
});
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem;

  .logo {
    width: 200px;
    margin: 2rem;
  }
}
</style>