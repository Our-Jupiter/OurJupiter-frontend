<template>
  <div class="list">
    <div class="row">
      <div class="col-md-6">
        <router-link
          :to="{ name: 'save', params: { id: $route.params.id } }"
          style="color: rgb(25, 91, 255)"
        >
          글 등록하러 가기
        </router-link>
      </div>
    </div>
    <br />
    <ul class="postList">
      <li v-for="post in reverseList" :key="post.id">
        <router-link
          :to="{
            name: 'detail',
            params: { id: post.id, groupId: $route.params.id },
          }"
        >
          <BaseCard
            v-if="post.fileId"
            :title="post.title"
            :img="image + post.fileId"
            :author="post.author"
          />
          <BaseCard v-else :title="post.title" :author="post.author" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import router from '@/router';

export default Vue.extend({
  name: 'List',
  beforeMount() {
    this.getData();
  },
  data() {
    return {
      allData: [],
      image: '',
    };
  },
  computed: {
    reverseList(): any {
      return this.allData.slice().reverse();
    },
  },
  methods: {
    async getData() {
      try {
        const data = await axios.get('http://localhost:8080/board/', {
          params: { groupId: this.$route.params.id },
        });
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
.postList {
  list-style: none;
}
</style>
