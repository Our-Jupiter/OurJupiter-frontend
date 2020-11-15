<template>
  <div class="wrapper">
    <div class="header">
      <h2 class="title">{{ me.name }} 님의 목성 공간들</h2>
      <div class="button">
        <BaseButton @click="logout">로그아웃</BaseButton>
      </div>
    </div>
    <div class="groupList">
      <BaseCard class="group" title="+">
        <template #interaction>
          <BaseButton @click="createGroup">추가</BaseButton>
        </template>
      </BaseCard>
      <BaseCard
        class="group"
        v-for="(group, index) in groupList"
        :key="index"
        :title="group.value"
      >
        <template #interaction>
          <BaseButton
            color="danger"
            danger
            @click="enterGroup(group.key, group.value)"
          >
            입장
          </BaseButton>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import router from '@/router';
import GroupCreate from './GroupCreate.vue';

export default Vue.extend({
  name: 'GroupList',
  data() {
    return {
      groupList: [],
    };
  },
  beforeMount() {
    this.getGroup();
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
    async logout() {
      if (!(await this.$confirm('로그아웃 하시겠습니까?'))) return;
      localStorage.removeItem('token');
      router.push('/login');
    },
    enterGroup(groupId: number, groupName: string) {
      router.push(`/group/${groupId}?groupName=${groupName}`);
    },
    async getGroup() {
      try {
        const data = await axios.get('http://localhost:8080/group', {
          headers: this.headers,
        });
        this.groupList = data.data;
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
    async createGroup() {
      this.$popup.open({
        component: GroupCreate,
        data: { callback: this.getGroup.bind(this) },
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  min-height: 100%;
  background-color: rgba(30, 32, 35, 1);
  margin: 0;

  .header {
    display: flex;
    justify-content: flex-end;

    .title {
      color: white;
      padding: 2rem;
    }
    .button {
      margin: 2.6rem;
    }
  }

  .groupList {
    display: grid;
    grid-template-columns: 25% 25% 25%;
    justify-content: center;
    align-items: center;
    padding: 3rem;

    .group {
      margin: 2rem;
      text-align: center;
    }
  }
  @media (max-width: 760px) {
    .groupList {
      display: grid;
      grid-template-columns: 80%;
      justify-content: center;
      align-items: center;
      padding: 3rem;
    }
  }
}
</style>
