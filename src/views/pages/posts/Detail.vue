<template>
  <div class="main">
    <div class="content">
      <div class="hidden" style="display: none">
        <input type="text" class="form-control" id="id" readonly />
      </div>
      <h5>제목: {{ postData.title }}</h5>
      <h5>작성자: {{ postData.author }}</h5>
      <p>
        <small>
          <b>수정 날짜:</b>
          {{ postData.modifiedDate }}
        </small>
      </p>
      <p>
        <b>내용:</b>
        {{ postData.content }}
      </p>
      <div class="picture" v-if="postData.fileId">
        <img :src="image" style="width: 80%" />
      </div>
    </div>
    <div class="button">
      <div>
        <BaseButton @click="backToFeed($route.params.groupId)">
          목록으로 돌아가기
        </BaseButton>
      </div>
      <div v-if="me.email === postData.authorEmail">
        <BaseButton @click="enterUpdate(postData.id)">수정</BaseButton>
      </div>
      <div v-if="me.email === postData.authorEmail">
        <BaseButton @click="deletePost">삭제</BaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import router from '@/router';

export default Vue.extend({
  name: 'Detail',
  beforeMount() {
    this.getDetail();
  },
  computed: {
    me(): object {
      return this.$store.state.me.me;
    },
  },
  data() {
    return {
      postData: [],
      image: '',
    };
  },
  methods: {
    enterUpdate(postId: string) {
      router.push({
        name: 'update',
        params: {
          groupId: this.$route.params.groupId,
          postId,
        },
      });
    },
    backToFeed(groupId: number) {
      router.push({ path: `/list/${groupId}` });
    },
    async getDetail() {
      try {
        const postId = this.$route.params.postId;
        const data = await axios.get('http://localhost:8080/board/' + postId);
        this.postData = data.data;

        const fileId = data.data.fileId;
        this.image = 'http://localhost:8080/board/file/' + fileId;
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
    async deletePost() {
      try {
        const groupId = this.$route.params.groupId;
        const postId = this.$route.params.postId;
        await axios.delete('http://localhost:8080/board/' + postId);
        this.$snackbar.success('글이 삭제되었습니다!');
        router.push({ path: `/list/${groupId}` });
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
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

  .content {
    padding: 1rem;
    display: flex;
    width: 70%;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    margin: 5rem;
    border: 2px solid;

    .picture {
      width: 100%;
      height: auto;
      padding: 1rem;
      display: flex;
      justify-content: center;
    }
  }
  .button {
    display: flex;
  }
}

@media (max-width: 760px) {
  .button {
    display: flex;
    margin: 2rem 3rem;
  }
}
</style>
