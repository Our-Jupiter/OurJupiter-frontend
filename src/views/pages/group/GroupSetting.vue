<template>
  <div class="group-setting">
    <BaseInput v-model="name" label="그룹 이름" />
    <div class="button">
      <BaseButton @click="updateGroup(groupId)">이름 수정하기</BaseButton>
      <BaseButton color="danger" @click="deleteGroup(groupId)">
        삭제하기
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import router from '@/router';

export default Vue.extend({
  name: 'GroupSetting',
  props: ['popupData'],
  data() {
    return {
      name: this.$route.query.groupName,
      groupId: this.$route.params.id,
    };
  },
  computed: {
    headers(): object {
      const token = localStorage.getItem('token');
      return token ? { 'x-access-token': token } : {};
    },
  },
  methods: {
    async updateGroup(id: number) {
      try {
        if (!this.name) {
          this.$snackbar.warn('그룹이름은 빈값으로 수정 불가능합니다 !');
          return;
        }
        const data = await axios.put(
          `http://localhost:8080/group/${id}`,
          { name: this.name },
          { headers: this.headers }
        );
        this.$popup.close();
        router.push('/group');
        this.$snackbar.success(this.name + '으로 그룹 이름이 변경되었습니다 !');
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
    async deleteGroup(id: number) {
      try {
        if (!(await this.$confirm('그룹을 삭제하시겠습니까?'))) return;
        const data = await axios.delete(`http://localhost:8080/group/${id}`, {
          headers: this.headers,
        });
        this.$popup.close();
        router.push('/group');
        this.$snackbar.success('삭제되었습니다 !');
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.group-setting {
  .button {
    display: flex;
    justify-content: flex-end;
  }
}
</style>