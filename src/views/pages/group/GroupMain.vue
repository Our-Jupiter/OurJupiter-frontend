<template>
  <div class="main">
    <div class="service-name">
      <img :src="require('@/assets/logo.png')" style="width: 35px" />
      아워목성
    </div>
    <h2>{{ $route.query.groupName }}</h2>
    <div class="manage">
      <BaseButton
        v-if="me.email === ownerEmail && !activeRoutineStartDate"
        @click="createRoutine"
      >
        루틴 생성하기
      </BaseButton>
      <BaseButton
        v-if="me.email === ownerEmail && today === activeRoutineEndDate"
        @click="finishRoutine"
        color="danger"
      >
        루틴 종료하기
      </BaseButton>
      <BaseButton v-if="activeRoutineStartDate" color="success">
        루틴 진행 중
      </BaseButton>
      <BaseButton v-if="!activeRoutineStartDate" color="warn">
        루틴 미진행 중
      </BaseButton>
      <BaseButton v-if="me.email === ownerEmail" @click="manageGroup">
        <BaseIcon>settings</BaseIcon>
      </BaseButton>
      <BaseButton v-if="me.email === ownerEmail" @click="inviteGroup">
        이메일로 초대하기
      </BaseButton>
    </div>
    <div class="header">
      <div class="avatar">
        <BaseAvatar />
        <h2 class="name">{{ me.name }}</h2>
      </div>
      <div class="button">
        <BaseButton @click="enterFeed">그룹 피드</BaseButton>
        <BaseButton @click="enterRecord">결과 기록</BaseButton>
        <BaseButton v-if="activeRoutineStartDate" @click="enterlist"
          >인증 현황</BaseButton
        >
        <BaseButton
          v-if="goal && !certificationDailyCheck"
          @click="enterCertification"
          >인증하기</BaseButton
        >
        <BaseButton color="success" v-if="goal && certificationDailyCheck"
          >인증완료</BaseButton
        >
      </div>
    </div>
    <div v-if="today === activeRoutineEndDate" class="goFeedback">
      오늘은 루틴 종료 날 입니다. 피드백을 제출해주세요.
      <BaseButton @click="enterlist">피드백 제출하러 가기</BaseButton>
    </div>
    <div class="content">
      <div v-if="!activeRoutineStartDate">
        <h3>루틴 미진행 중 입니다.</h3>
      </div>
      <div v-if="activeRoutineStartDate && !goal" class="goalInfo">
        <h3>이번 루틴 목표를 아직 입력하지 않았어요!</h3>
        <BaseButton @click="setGoalPenalty">목표 입력하기</BaseButton>
      </div>
      <h3 v-if="activeRoutineStartDate && goal">
        이번 루틴 목표는 ' {{ goal }} ' 입니다.
      </h3>
    </div>
    <div class="daily" v-if="activeRoutineStartDate && goal">
      <div v-if="!certificationDailyCheck">
        <h2 class="today">{{ today }}</h2>
        <br />
        <h3>오늘 인증을 아직 하지 않았습니다! 인증해주세요</h3>
      </div>
      <div v-else>
        <h2 class="today">{{ today }}</h2>
        <br />
        <h3>오늘의 인증을 완료하였습니다!</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import moment from 'moment';
import router from '@/router';
import { setCookie, getCookie } from '@/utils/cookie/cookie';
import GroupSetting from './GroupSetting.vue';
import GroupInvite from './GroupInvite.vue';
import GoalSet from '@/views/pages/goal/GoalSet.vue';
import RoutineEndNotice from './RoutineEndNotice.vue';

export default Vue.extend({
  name: 'GroupMain',
  data() {
    return {
      ownerEmail: '',
      goal: '',
      penalty: '',
      today: '',
      activeRoutineStartDate: '',
      activeRoutineEndDate: '',
      certificationDailyCheck: '',
    };
  },
  async beforeMount() {
    this.getGroupOwnerEmail();
    await this.getRoutineInfo();
    this.getDailyCheckInfo();
    this.today = this.getFormatDate(new Date());
    if (this.today === this.activeRoutineEndDate) {
      this.getRoutineEndNotice();
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
  watch: {
    activeRoutineStartDate(newValue: string) {
      if (this.activeRoutineStartDate) {
        this.getGoalPenalty();
      }
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
    async getGroupOwnerEmail() {
      const data = await axios.get(
        'http://localhost:8080/group/' + this.$route.params.id
      );
      this.ownerEmail = data.data;
    },
    enterFeed() {
      router.push({
        name: 'list',
        params: {
          groupId: this.$route.params.id,
        },
        query: {
          groupName: this.$route.query.groupName,
        },
      });
    },
    enterRecord() {
      router.push({
        name: 'goalRecord',
        params: {
          groupId: this.$route.params.id,
        },
        query: {
          groupName: this.$route.query.groupName,
        },
      });
    },
    enterlist() {
      router.push({
        name: 'certificationList',
        params: {
          groupId: this.$route.params.id,
        },
        query: {
          groupName: this.$route.query.groupName,
        },
      });
    },
    enterCertification() {
      router.push({
        name: 'certificationCreate',
        params: {
          groupId: this.$route.params.id,
        },
        query: {
          groupName: this.$route.query.groupName,
        },
      });
    },
    manageGroup() {
      this.$popup.open({
        component: GroupSetting,
      });
    },
    inviteGroup() {
      this.$popup.open({
        component: GroupInvite,
      });
    },
    async getRoutineInfo() {
      const data = await axios.get(
        `http://localhost:8080/routine/${this.$route.params.id}`
      );

      if (data.data) {
        this.activeRoutineStartDate = data.data;
        this.activeRoutineEndDate = moment(data.data, 'YYYY-MM-DD')
          .add(13, 'days')
          .format('YYYY-MM-DD');
      } else {
        this.activeRoutineStartDate = '';
        this.activeRoutineEndDate = '';
      }
    },
    async getDailyCheckInfo() {
      const data = await axios.get(
        `http://localhost:8080/certification/${this.$route.params.id}`,
        { headers: this.headers }
      );
      this.certificationDailyCheck = data.data;
    },
    async createRoutine() {
      await axios.post(
        'http://localhost:8080/routine/',
        {
          groupId: this.$route.params.id,
          startDate: new Date(),
        },
        { headers: this.headers }
      );
      this.getRoutineInfo();
    },
    async getGoalPenalty() {
      try {
        const data = await axios.get(
          `http://localhost:8080/goal/${this.$route.params.id}`,
          { headers: this.headers }
        );
        this.goal = data.data.goal;
        this.penalty = data.data.penalty;
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
    setGoalPenalty() {
      this.$popup.open({
        component: GoalSet,
        data: {
          groupId: this.$route.params.id,
          callback: this.getGoalPenalty.bind(this),
        },
      });
    },
    getRoutineEndNotice() {
      if (!getCookie()) {
        setCookie('routineEnd', 'Y', 1);
      }
      if (getCookie() !== 'N') {
        this.$popup.open({
          component: RoutineEndNotice,
          notClose: true,
          preventClose: true,
        });
      }
    },
    async finishRoutine() {
      if (!(await this.$confirm('루틴을 종료하시겠습니까?'))) return;
      try {
        await axios.post(
          `http://localhost:8080/routine/${this.$route.params.id}`,
          {},
          { headers: this.headers }
        );
        this.$snackbar.success('성공적으로 종료되었습니다 !');
        this.getRoutineInfo();
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.main {
  background-color: rgba(30, 32, 35, 1);
  color: white;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2rem;

  .service-name {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .manage {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin: 0.5rem;
    margin-right: 20%;
  }

  .header {
    display: flex;
    flex-direction: row;

    .avatar {
      display: flex;
      margin: 2rem 6rem 2rem 0rem;

      .name {
        margin: 1.6rem;
      }
    }
    .button {
      display: flex;
      margin: 3rem 0rem 3rem 6rem;
    }
  }

  .goFeedback {
    display: flex;
    align-items: center;
    margin: 1rem 0rem;
  }

  .content {
    width: 80%;
    background-color: rgba(244, 247, 248, 1);
    color: black;
    display: flex;
    justify-content: center;
    border: 1px solid;
    border-radius: 5px;
    padding: 1rem 0;

    .goalInfo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .daily {
    width: 80%;
    background-color: rgba(244, 247, 248, 1);
    color: black;
    display: flex;
    justify-content: center;
    border: 1px solid;
    margin: 1rem 4rem;
    padding: 2rem;
    border-radius: 5px;

    .today {
      display: flex;
      justify-content: center;
    }
  }

  @media (max-width: 760px) {
    .manage {
      margin: 0.5rem 0rem;
      display: flex;
      justify-content: center;
    }

    .header {
      display: flex;
      flex-direction: column;

      .avatar {
        display: flex;
        margin: 1rem 3rem;

        .name {
          margin: 1rem;
        }
      }
      .button {
        display: flex;
        margin: 1.5rem 0rem 1.5rem 0rem;
      }
    }

    .goFeedback {
      display: flex;
      flex-direction: column;
      font-size: 0.9rem;
    }
    .content {
      width: 90%;
      font-size: 0.7rem;
    }

    .daily {
      width: 90%;
      font-size: 0.7rem;
    }
  }
}
</style>
