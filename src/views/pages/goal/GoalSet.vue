<template>
  <div class="set-goal">
    <BaseInput v-model="goal" label="목표 한마디" />
    <BaseInput v-model="penalty" label="패널티: 이를 못 지킬 시" />
    <div class="button">
      <BaseButton @click="setGoalPenalty">설정하기</BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  name: 'GoalSet',
  props: ['popupData'],
  data() {
    return {
      goal: '',
      penalty: '',
    };
  },
  computed: {
    headers(): object {
      const token = localStorage.getItem('token');
      return token ? { 'x-access-token': token } : {};
    },
  },
  methods: {
    async setGoalPenalty() {
      try {
        await axios.put(
          `http://localhost:8080/goal/${this.popupData.groupId}`,
          {
            goal: this.goal,
            penalty: this.penalty,
          },
          { headers: this.headers }
        );
        this.$popup.close();
        this.popupData.callback();
        this.$snackbar.success('목표와 패널티가 설정되었습니다 !');
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.set-goal {
  .button {
    display: flex;
    justify-content: flex-end;
  }
}
</style>