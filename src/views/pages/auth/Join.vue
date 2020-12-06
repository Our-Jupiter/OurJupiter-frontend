<template>
  <div class="join">
    <div class="service-name">
      <img :src="require('@/assets/logo.png')" style="width: 200px" />
      <h2 class="title">아워목성 회원가입</h2>
      <br />
    </div>
    <BaseInput v-model="email" label="이메일" />
    <BaseInput v-model="name" label="닉네임" />
    <BaseInput
      v-model="password"
      label="비밀번호(8자리 이상)"
      type="password"
    />
    <br />
    <BaseButton @click="join">회원가입</BaseButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import router from '@/router';

export default Vue.extend({
  name: 'Join',
  data() {
    return {
      email: '',
      name: '',
      password: '',
    };
  },
  methods: {
    async join() {
      if (!this.email || !this.name || !this.password) {
        this.$snackbar.warn('이메일과 닉네임, 비밀번호를 모두 입력해주세요 !');
        return;
      }
      if (this.password.length < 8) {
        this.$snackbar.warn('비밀번호는 8자리 이상으로 입력해주세요 !');
        return;
      }

      try {
        await axios.post('http://localhost:8080/join', {
          email: this.email,
          name: this.name,
          password: this.password,
        });

        this.$snackbar.success(
          '회원가입이 완료되었습니다 !<br/> 로그인 페이지로 이동합니다.'
        );
        router.push({ path: '/login' });
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.join {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  .title {
    padding: 1rem;
    display: flex;
    justify-content: center;
  }
}
</style>
