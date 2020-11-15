<template>
  <div class="main">
    <h2>{{ $route.query.groupName }}</h2>
    <div class="manage">
      <BaseButton @click="manageGroup">
        <BaseIcon>settings</BaseIcon>
      </BaseButton>
      <BaseButton>이메일로 초대하기</BaseButton>
    </div>
    <div class="header">
      <div class="avatar">
        <BaseAvatar />
        <h2 class="name">{{ me.name }}</h2>
      </div>
      <div class="button">
        <BaseButton @click="enterFeed($route.params.id)">그룹 피드</BaseButton>
        <BaseButton>인증 현황</BaseButton>
        <BaseButton>인증하기</BaseButton>
      </div>
    </div>
    <div class="content">
      <h2>이번달 목표는 ' ' 입니다</h2>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import router from '@/router';
import GroupSetting from './GroupSetting.vue';

export default Vue.extend({
  name: 'GroupMain',
  computed: {
    me(): object {
      return this.$store.state.me.me;
    },
  },
  methods: {
    enterFeed(groupId: number) {
      router.push({ path: `/list/${groupId}` });
    },
    manageGroup() {
      this.$popup.open({
        component: GroupSetting,
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
