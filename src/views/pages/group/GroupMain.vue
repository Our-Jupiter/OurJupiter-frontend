<template>
  <div class="main">
    <h2>{{ $route.query.groupName }}</h2>
    <div class="manage">
      <BaseButton
        v-if="me.email === ownerEmail && !activeRoutineStartDate"
        @click="createRoutine"
      >
        루틴 생성하기
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
        <BaseButton @click="enterFeed($route.params.id)">그룹 피드</BaseButton>
        <BaseButton>인증 현황</BaseButton>
        <BaseButton @click="enterCertification">인증하기</BaseButton>
      </div>
    </div>
    <div class="content">
      <div v-if="!goal">
        이번 루틴 목표를 아직 입력하지 않았어요!
        <BaseButton @click="setGoalPenalty">목표 입력하기</BaseButton>
      </div>
      <h2 v-else>이번 루틴 목표는 {{ goal }} 입니다</h2>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import router from '@/router';
import GroupSetting from './GroupSetting.vue';
import GroupInvite from './GroupInvite.vue';
import GoalSet from '@/views/pages/goal/GoalSet.vue';

export default Vue.extend({
  name: 'GroupMain',
  data() {
    return {
      ownerEmail: '',
      goal: '',
      penalty: '',
      activeRoutineStartDate: '',
    };
  },
  beforeMount() {
    this.getGroupOwnerEmail();
    this.getRoutineInfo();
    console.log(new Date());
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
    async getGroupOwnerEmail() {
      const data = await axios.get(
        'http://localhost:8080/group/' + this.$route.params.id
      );
      this.ownerEmail = data.data;
    },
    enterFeed(groupId: number) {
      router.push({ path: `/list/${groupId}` });
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
      this.activeRoutineStartDate = data.data;
    },
    async createRoutine() {
      await axios.post(
        'http://localhost:8080/routine/',
        { groupId: this.$route.params.id, startDate: new Date() },
        { headers: this.headers }
      );
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
  },
});
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
      margin: 3rem 6rem;

      .name {
        margin: 1.6rem;
      }
    }
    .button {
      display: flex;
      margin: 4rem 6rem;
    }
  }

  .content {
    width: 70%;
    display: flex;
    justify-content: center;
    border: 1px solid;
    border-radius: 5px;
  }

  @media (max-width: 760px) {
    .manage {
      margin-right: 5%;
    }

    .header {
      display: flex;
      flex-direction: column;

      .avatar {
        display: flex;
        margin: 1.5rem 3rem;

        .name {
          margin: 0.8rem;
        }
      }
      .button {
        display: flex;
        margin: 2rem 3rem;
      }
    }
  }
}
</style>
