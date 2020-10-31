<template>
  <div class="login">
    <BaseInput v-model="email" label="이메일" />
    <BaseInput v-model="password" label="비밀번호" type="password" />
    <BaseButton @click="login">Login</BaseButton>
    <router-link to="/join" style="color: rgb(25, 91, 255)">
      아직 회원이 아니신가요?
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import router from '@/router';

export default Vue.extend({
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      if (!this.email || !this.password) {
        this.$snackbar.warn('이메일과 비밀번호를 모두 입력해주세요 !');
        return;
      }

      try {
        const data = await axios.post('http://localhost:8080/login', {
          email: this.email,
          password: this.password,
        });

        localStorage.setItem('token', data.data);
        this.$snackbar.success('환영합니다 !');

        router.push({ path: '/' });
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
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
  padding: 10rem;
}
</style>