<template>
  <div class="list">
    <div class="backButton">
      <BaseButton @click="back">뒤로가기</BaseButton>
    </div>
    <div class="header">
      <h2>그룹 피드</h2>
      <br />
      <BaseButton @click="savePost">글 등록</BaseButton>
    </div>
    <br />
    <ul class="postList">
      <li v-for="post in reverseList" :key="post.id" class="post">
        <router-link
          :to="{
            name: 'detail',
            params: { postId: post.id, groupId: $route.params.groupId },
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
          params: { groupId: this.$route.params.groupId },
        });
        this.allData = data.data;

        if (this.allData.length == 0) {
          this.$snackbar.info('아직 피드에 글이 없습니다! 한 번 작성해보세요!');
        }

        this.image = 'http://localhost:8080/board/file/';
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
    savePost() {
      router.push({
        name: 'save',
        params: { groupId: this.$route.params.groupId },
      });
    },
    back() {
      router.push({
        name: 'groupMain',
        params: {
          id: this.$route.params.groupId,
        },
        query: {
          groupName: this.$route.query.groupName,
        },
      });
    },
  },
});
</script>
<style lang="scss" scoped>
.list {
  display: flex;
  background-color: rgba(30, 32, 35, 1);
  color: white;
  flex-direction: column;
  width: 100%;
  min-height: 100%;

  .backButton {
    display: flex;
    justify-content: flex-end;
    padding: 1rem 1rem 0 0;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .postList {
    list-style: none;
    flex-direction: column;
    display: flex;
    align-items: center;
  }
  .post {
    padding: 1rem;
  }
}
</style>
