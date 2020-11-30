<template>
  <div class="wrapper">
    <div class="button">
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
    <ul class="certificationUl">
      <li
        v-for="(certification, index) in certificationList"
        :key="index"
        class="certificationLi"
      >
        <h4>{{ certification.userName }}</h4>
        <BaseCard
          class="certification"
          v-if="certification.fileId"
          :title="certification.todayDate"
          author="오늘의 인증 완료!"
          :img="image + certification.fileId"
        />
        <BaseCard
          class="certification"
          v-else
          :title="certification.todayDate"
          author="아직 인증하지 않았습니다!"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import router from '@/router';

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
    };
  },
  beforeMount() {
    this.today = this.getFormatDate(new Date());
    this.getGoalList();
    this.getDailyCertification();
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
    getFormatDate(date: any) {
      const year = date.getFullYear(); //yyyy
      let month = 1 + date.getMonth(); //M
      month = month >= 10 ? month : '0' + month; //month 두자리로 저장
      let day = date.getDate(); //d
      day = day >= 10 ? day : '0' + day; //day 두자리로 저장
      return year + '-' + month + '-' + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
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

  .button {
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

  .certificationUl {
    display: grid;
    grid-template-columns: 30% 30% 30%;
    justify-content: center;
    align-items: center;

    .certificationLi {
      list-style: none;
      margin: 1.5rem 1rem;
    }

    .certification {
      margin: 1rem;
      text-align: center;
    }
  }
  @media (max-width: 760px) {
    .goalList {
      display: grid;
      grid-template-columns: 100%;
      justify-content: center;
      align-items: center;
      padding: 2rem;

      .goal {
        font-size: 1rem;
      }
    }

    .certificationUl {
      display: grid;
      grid-template-columns: 1fr;
    }
  }
}
</style>
