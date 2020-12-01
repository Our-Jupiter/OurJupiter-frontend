<template>
  <div class="wrapper">
    <div class="backButton">
      <BaseButton @click="back">뒤로가기</BaseButton>
    </div>
    <div class="header">
      <h2 class="title">{{ this.$route.query.groupName }} 의 인증 결과 기록</h2>
    </div>
    <div v-for="(record, index) in recordList" :key="index" class="recordList">
      <div class="toggle"><b>루틴 시작 날짜: </b>{{ record.key }}</div>
      <div class="record" v-for="(list, index) in record.value" :key="index">
        {{ list.userName }}
        <BaseButton color="danger" v-if="list.success === false"
          >실패</BaseButton
        >
        <BaseButton v-else>성공</BaseButton>
        <div class="penalty" v-if="list.success === false">
          {{ list.penalty }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import router from '@/router';
import moment from 'moment';

export default Vue.extend({
  name: 'GoalRecord',
  data() {
    return {
      goal: '',
      penalty: '',
      today: '',
      recordList: [],
      endDate: '',
    };
  },
  async beforeMount() {
    this.today = this.getFormatDate(new Date());
    await this.getRecord();
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
    async getRecord() {
      try {
        const data = await axios.get(
          `http://localhost:8080/record/${this.$route.params.groupId}`,
          { headers: this.headers }
        );
        this.recordList = data.data;
        if (this.recordList.length == 0) {
          this.$snackbar.info('그룹 결과 기록이 아직 존재하지 않습니다!');
        }
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

  .recordList {
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

    .record {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px 4rem;
      padding: 0.5rem;
      margin: 0.5rem;
      border-radius: 5px;
      justify-content: center;
      align-items: center;
    }

    .button {
      display: flex;
    }
  }

  @media (max-width: 760px) {
    .recordList {
      .record {
        font-size: 1rem;
      }
    }

    .recordList {
      margin: 0;
      .record {
        display: grid;
        grid-template-columns: 50%;
      }
    }
  }
}
</style>
