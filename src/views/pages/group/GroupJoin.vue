<template>
  <div class="wrapper">
    <img class="image" src="@/assets/logo.png" />
    <BaseButton v-if="isRightUser" @click="join">가입하기</BaseButton>
    <h3 v-else>권한이 없습니다.</h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import router from '@/router';

export default Vue.extend({
  name: 'GroupJoin',
  data() {
    return {
      userId: 0,
      groupId: 0,
    };
  },
  beforeMount() {
    if (!this.$store.state.me.me) {
      this.$snackbar.error('로그인 한 뒤, 다시 접속해주세요 !');
    }
    this.setting();
  },
  computed: {
    isRightUser(): boolean {
      return this.$store.state.me.me.id === this.userId;
    },
  },
  methods: {
    setting() {
      this.userId = parseInt(this.$route.params.userId);
      this.groupId = parseInt(this.$route.params.groupId);
    },
    async join() {
      try {
        await axios.post('http://localhost:8080/invite', {
          userId: this.userId,
          groupId: this.groupId,
        });
        this.$snackbar.success('가입 완료되었습니다 !');
        router.push('/group');
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5rem;

  .image {
    width: 300px;
    height: 300px;
    margin: 2rem 0;
  }
}
</style>
