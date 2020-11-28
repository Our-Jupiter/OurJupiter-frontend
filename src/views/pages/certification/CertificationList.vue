<template>
  <div class="wrapper">
    <div class="header">
      <h2 class="title">
        {{ this.$route.query.groupName }} 의 {{ today }} 인증 현황
      </h2>
    </div>
    <div class="goalList">
      <div>
        <h2 class="goal">
          <p>그룹원들의 이번 루틴 목표</p>
        </h2>
        <br />
        <div class="goal" v-for="(goal, index) in goalList" :key="index">
          {{ goal.key }}: {{ goal.value }}
        </div>
      </div>
    </div>
    <ul class="certificationUl">
      <li
        v-for="certification in certificationList"
        :key="certification.key"
        class="certificationLi"
      >
        <BaseCard
          class="certification"
          v-if="certification.value"
          :title="certification.key"
          author="오늘의 인증 완료!"
          :img="image + certification.value"
        />
        <BaseCard
          class="certification"
          v-else
          :title="certification.key"
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
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  min-height: 100%;
  margin: 0;

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      padding: 3rem;
    }
  }

  .goalList {
    display: flex;
    justify-content: center;
    border: 1px solid;
    margin: 4rem 4rem 4rem 4rem;
    padding: 2rem 2rem 2rem 2rem;
    border-radius: 5px;

    .goal {
      display: flex;
      justify-content: center;
    }
  }

  .certificationUl {
    display: grid;
    grid-template-columns: 30% 30% 30%;
    justify-content: center;
    align-items: center;
    padding: 3rem;

    .certificationLi {
      list-style: none;
    }

    .certification {
      margin: 1rem;
      text-align: center;
    }
  }
  @media (max-width: 760px) {
    .goalList {
      display: grid;
      grid-template-columns: 80%;
      justify-content: center;
      align-items: center;
      padding: 3rem;
    }
  }
}
</style>
