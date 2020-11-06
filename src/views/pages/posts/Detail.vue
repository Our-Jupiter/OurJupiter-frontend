<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <div class="hidden" style="display:none">
          <input type="text" class="form-control" id="id" readonly />
        </div>
        <h5 class="card-title">제목: {{ postData.title }}</h5>
        <h5 class="card-title">작성자: {{ postData.author }}</h5>
        <p class="card-text">
          <small class="text-muted">
            <b>수정 날짜:</b>
            {{ postData.modifiedDate }}
          </small>
        </p>
        <p class="card-text">
          <b>내용:</b>
          {{ postData.content }}
        </p>
        <div class="bigPictureWrapper">
          <div class="bigPicture" v-if="postData.fileId">
            <img :src="image" width="50%" height="50%" />
          </div>
        </div>
      </div>
    </div>
    <div class="col-auto">
      <div class="col-auto">
        <router-link to="/">
          <BaseButton>홈으로 돌아가기</BaseButton>
        </router-link>
      </div>
      <div class="col-auto">
        <router-link :to="{ name: 'update', params: { id: postData.id } }">
          <BaseButton>수정</BaseButton>
        </router-link>
      </div>
      <div class="col-auto">
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
  created() {
    this.detail();
  },
  data() {
    return {
      postData: [],
      image: '',
    };
  },
  methods: {
    async detail() {
      try {
        const id = this.$route.params.id;
        const data = await axios.get(
          'http://localhost:8080/api/v1/posts/' + id
        );
        this.postData = data.data;

        const fileId = data.data.fileId;
        this.image = 'http://localhost:8080/api/v1/posts/file/' + fileId;
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
    async deletePost() {
      try {
        const id = this.$route.params.id;
        const data = await axios.delete(
          'http://localhost:8080/api/v1/posts/' + id
        );
        this.$snackbar.success('글이 삭제되었습니다!');
        router.push({ path: '/' });
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem;
}
</style>
