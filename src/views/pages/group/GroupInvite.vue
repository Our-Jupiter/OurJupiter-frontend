<template>
  <div class="group-invite">
    <BaseInput v-model="email" label="초대할 사람의 이메일" />
    <div class="button">
      <BaseButton @click="sendEmail">초대 이메일 전송</BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import router from '@/router';

export default Vue.extend({
  name: 'GroupInvite',
  props: ['popupData'],
  data() {
    return {
      name: this.$route.query.groupName,
      groupId: this.$route.params.id,
      email: '',
    };
  },
  methods: {
    async sendEmail() {
      try {
        if (!this.email) {
          this.$snackbar.warn('이메일을 입력해주세요');
          return;
        }
        const data = await axios.post('http://localhost:8080/mail', {
          groupId: this.groupId,
          groupName: this.name,
          email: this.email,
        });
        this.$popup.close();
        this.$snackbar.success(
          this.email + '로 그룹 초대 메일이 전송되었습니다'
        );
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.group-invite {
  .button {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
