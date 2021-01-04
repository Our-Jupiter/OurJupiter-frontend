<template>
  <div class="wrapper">
    <div class="backButton">
      <BaseButton @click="back">뒤로가기</BaseButton>
    </div>
    <div class="header">
      <h2 class="title">
        {{ this.$route.query.groupName }} 의 이번 루틴 인증 현황
      </h2>
      * 인증 검사는 루틴 종료 날 가능합니다 *
    </div>
    <div class="goalList">
      <div>
        <h3 class="goal">그룹원들의 이번 루틴 목표</h3>
        <br />
        <div class="detailGoal" v-for="(goal, index) in goalList" :key="index">
          {{ goal.key }} : {{ goal.value }}
        </div>
      </div>
    </div>
    <div
      v-for="(certification, index) in certificationList"
      :key="index"
      class="certificationList"
    >
      <div class="toggle">
        {{ certification.key }}
      </div>
      <div class="certification">
        <BaseCard
          v-for="(day, idx) in certification.value"
          :key="idx"
          :title="day.todayDate"
          :author="
            day.fileId ? '오늘의 인증 완료!' : '아직 인증하지 않았습니다!'
          "
          :img="day.fileId ? image + day.fileId : undefined"
          class="card"
        />
      </div>
      <div v-if="endDate === today && !doFeedback" class="button">
        <BaseCheckBox
          v-model="agree[index]"
          label="수락하기"
          :checkedValue="certification.key"
        />
      </div>
    </div>
    <div v-if="endDate === today && !doFeedback" class="feedbackButton">
      <BaseButton @click="feedback">피드백 제출하기</BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import router from '@/router';
import moment from 'moment';
import { getFormatDate } from '@/utils/date.ts';

export default Vue.extend({
  name: 'CertificationList',
  data() {
    return {
      goal: '',
      penalty: '',
      today: '',
      image: '',
      goalList: [],
      certificationList: [],
      doFeedback: false,
      endDate: '',
      agree: [] as string[],
    };
  },
  async beforeMount() {
    this.today = getFormatDate(new Date());
    this.getRoutineInfo();
    this.getDoFeedback();
    await this.getGoalList();
    await this.getDailyCertification();
    for (let i = 0; i < this.goalList.length; i++) {
      this.agree.push('');
    }
  },
  computed: {
    headers(): object {
      const token = localStorage.getItem('token');
      return token ? { 'x-access-token': token } : {};
    },
    me(): object {
      return this.$store.state.me.me;
    },
  },
  methods: {
    async getRoutineInfo() {
      const data = await axios.get(
        `http://localhost:8080/routine/${this.$route.params.groupId}`
      );
      this.endDate = moment(data.data, 'YYYY-MM-DD')
        .add(13, 'days')
        .format('YYYY-MM-DD');
    },
    async getGoalList() {
      try {
        const data = await axios.get(
          `http://localhost:8080/goalList/${this.$route.params.groupId}`,
          { headers: this.headers }
        );
        this.goalList = data.data;
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
    async getDailyCertification() {
      try {
        const data = await axios.get(
          `http://localhost:8080/daily/${this.$route.params.groupId}`,
          { headers: this.headers }
        );
        this.certificationList = data.data;
        this.image = 'http://localhost:8080/board/file/';
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
    async getDoFeedback() {
      try {
        const data = await axios.get(
          `http://localhost:8080/feedback/${this.$route.params.groupId}`,
          { headers: this.headers }
        );
        this.doFeedback = data.data;
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
    async feedback() {
      this.agree = this.agree.map(a => {
        return !a ? '' : a;
      });
      try {
        await axios.put(
          `http://localhost:8080/feedback/${this.$route.params.groupId}`,
          this.agree,
          { headers: this.headers }
        );
        this.$snackbar.success('피드백 제출이 완료되었습니다 !');
        this.back();
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
    back() {
      router.go(-1);
    },
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: rgba(30, 32, 35, 1);
  color: white;
  min-height: 100%;
  margin: 0;

  .backButton {
    display: flex;
    justify-content: flex-end;
    padding: 1rem 1rem 0 0;
  }

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      padding: 1rem;
    }
  }

  .goalList {
    display: flex;
    justify-content: center;
    border: 1px solid;
    margin: 2rem 4rem;
    padding: 2rem;
    border-radius: 5px;
    background-color: rgba(244, 247, 248, 1);
    color: black;

    .goal {
      display: flex;
      justify-content: center;
    }

    .detailGoal {
      display: flex;
      justify-content: flex-start;
    }
  }

  .certificationList {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem 4rem;
    padding: 2rem;

    .toggle {
      display: flex;
      justify-content: center;
      background-color: white;
      color: black;
      width: 100%;
      border-radius: 5px;
      padding: 0.5rem 0;
    }

    .certification {
      display: grid;
      grid-template-columns: 33% 33% 33%;
      justify-content: center;
      align-items: center;

      .card {
        padding: 1rem;
        text-align: center;
      }
    }

    .button {
      display: flex;
    }
  }
  .feedbackButton {
    display: flex;
    justify-content: center;
    padding: 2rem 0 3rem 0;
  }

  @media (max-width: 760px) {
    .goalList {
      .goal {
        font-size: 1rem;
      }
    }

    .certificationList {
      margin: 0;
      .certification {
        display: grid;
        grid-template-columns: 100%;
      }
    }
  }
}
</style>
