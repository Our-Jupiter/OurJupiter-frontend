<template>
  <div class="create-group">
    <BaseInput v-model="name" label="그룹 이름" />
    <div class="button">
      <BaseButton @click="createGroup">생성하기</BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  name: 'GroupCreate',
  props: ['popupData'],
  data() {
    return {
      name: '',
    };
  },
  computed: {
    headers(): object {
      const token = localStorage.getItem('token');
      return token ? { 'x-access-token': token } : {};
    },
  },
  methods: {
    async createGroup() {
      try {
        const data = await axios.post(
          'http://localhost:8080/group',
          {
            name: this.name,
          },
          { headers: this.headers }
        );
        this.$popup.close();
        this.popupData.callback();
        this.$snackbar.success(this.name + ' 그룹이 생성되었습니다 !');
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.create-group {
  .button {
    display: flex;
    justify-content: flex-end;
  }
}
</style>