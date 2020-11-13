<template>
  <div class="list">
    <div class="row">
      <div class="col-md-6">
        <router-link to="/save" style="color: rgb(25, 91, 255)">
          글 등록하러 가기
        </router-link>
      </div>
    </div>
    <br />
    <table class="table table-horizontal table-bordered">
      <thead class="thead-strong">
        <tr>
          <th>피드</th>
        </tr>
      </thead>
      <tbody id="tbody" v-for="post in allData" :key="post.id">
        <tr>
          <td>
            <router-link :to="{ name: 'detail', params: { id: post.id } }">
              <BaseCard
                :title="post.title"
                :img="image + post.fileId"
                :text="post.modifiedDate"
              />
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import router from '@/router';

export default Vue.extend({
  name: 'List',
  created() {
    this.getData();
  },
  data() {
    return {
      allData: null,
      image: '',
    };
  },
  methods: {
    async getData() {
      try {
        const data = await axios.get('http://localhost:8080/board/');
        this.allData = data.data;

        this.image = 'http://localhost:8080/board/file/';
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem;
}
</style>
