<template>
  <div class="routine-end-notice">
    오늘은 루틴 마지막 날 입니다! <br />
    구성원들이 피드백을 제출했다면 <br />
    그룹장 님은 루틴을 종료해주세요.
    <BaseCheckBox
      v-model="notSeeAgain"
      label="다시 보지 않기"
      class="checkbox"
    />
    <BaseButton @click="close">닫기</BaseButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { setCookie } from '@/utils/cookie.ts';

export default Vue.extend({
  name: 'RoutineEndNotice',
  data() {
    return {
      notSeeAgain: '',
    };
  },
  methods: {
    close() {
      if (this.notSeeAgain === 'checked') {
        setCookie('routineEnd', 'N', 1);
      }
      this.$popup.close();
    },
  },
});
</script>

<style lang="scss" scoped>
.routine-end-notice {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin: 1rem 0rem;

  .checkbox {
    margin-top: 10px;
  }
}
</style>
