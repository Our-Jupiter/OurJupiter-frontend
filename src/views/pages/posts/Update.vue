<template>
  <div class="update">
    <h2>글 수정</h2>
    <div class="form">
      <form id="UploadForm" enctype=”multipart/form-data” name="upload">
        <BaseInput v-model="title" type="text" label="제목" />
        <BaseInput v-model="author" type="text" label="작성자" :placeholder="$store.state.me.me.name" disabled />
        <br />
        <BaseTextBox v-model="content" label="내용" placeholder="내용을 입력하세요" />
        <br />
        <div>
          <div>
            <label>파일을 선택해 주세요.</label>
            <input name="file" type="file" ref="file" @change="previewImage">
          </div>
          <div class="image-preview" v-if="imageData">
            <img class="preview" :src="imageData" width="50%" height="50%">
          </div>
        </div>
      </form>
      <div class="button">
        <BaseButton @click="back">취소</BaseButton>
        <BaseButton @click="update">등록</BaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import router from '@/router';

export default Vue.extend({
  name: 'Update',
  data() {
    return {
      image: '',
      imageData: '',
      title: '',
      author: '',
      content: '',
      fileId: '',
    };
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    back() {
      router.push({
        name: 'detail',
        params: {
          postId: this.$route.params.postId,
          groupId: this.$route.params.groupId,
        },
      });
    },
    async getData() {
      try {
        const postId = this.$route.params.postId;
        const data = await axios.get('http://localhost:8080/board/' + postId);
        this.title = data.data.title;
        this.author = data.data.author;
        this.content = data.data.content;
        this.fileId = data.data.fileId;

        const fileId = data.data.fileId;
        if (fileId) {
          this.imageData = 'http://localhost:8080/board/file/' + fileId;
        }
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
    previewImage: function (event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageData = e.target.result as string;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    async update() {
      const postId = this.$route.params.postId;
      const form = new FormData(
        document.getElementById('UploadForm') as HTMLFormElement
      );

      form.append('title', this.title);
      form.append('content', this.content);
      form.append('author', this.$store.state.me.me.name);

      if (!this.title) {
        this.$snackbar.warn('제목을 입력해주세요');
        return;
      }

      try {
        await axios.put('http://localhost:8080/board/' + postId, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.$snackbar.success('글이 수정되었습니다!');
        router.push({
          name: 'detail',
          params: {
            postId: this.$route.params.postId,
            groupId: this.$route.params.groupId,
          },
        });
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.update {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem;

  .image-preview {
    padding: 2rem;
    display: flex;
    justify-content: center;
  }

  .button {
    display: flex;
    margin: 2rem 3rem;
    justify-content: center;
  }

  @media (max-width: 760px) {
    .form {
      display: grid;
      grid-template-columns: 80%;
      justify-content: center;
      align-items: center;
      padding: 3rem;
    }
    .button {
      display: flex;
      margin: 1rem 3rem;
    }
  }
}
</style>