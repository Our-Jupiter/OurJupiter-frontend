<template>
  <div class="save">
    <div class="form">
      <form id="UploadForm" enctype=”multipart/form-data” name="upload">
        <div class="form-group">
          <BaseInput v-model= "title" type="text" class="form-control" id="title" label="제목"/>
        </div>
        <div class="form-group">
          <BaseInput type="text" v-model= "author" class="form-control" id="author" label="작성자" :placeholder="$store.state.me.me.name" disabled />
        </div>
        <br>
        <div class="form-group">
          <label>내용: </label>
          <textarea v-model= "content" class="form-control" id="content" placeholder="내용을 입력하세요"></textarea>
        </div>
        <br>
        <div class="form-group">
          <div class="custom-file" id="inputFile">
            <label class="custom-file-label" for="customFile">파일을 선택해 주세요. </label>
            <input name="file" type="file" class="custom-file-input" id="customFile" ref="file" @change="uploadImage">
          </div>
          <div class="image-preview" v-if="imageData.length > 0">
            <img class="preview" :src="imageData" width="50%" height="50%">
          </div>
        </div>
      </form>
      </div>
      <div class="button">
        <BaseButton @click="back()">취소</BaseButton>
        <BaseButton @click="save">등록</BaseButton>
      </div>
    
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import router from '@/router';

export default Vue.extend({
  name: 'Save',
  data() {
    return {
      title: '',
      author: '',
      content: '',
      groupId: '',
      imageData: '',
    };
  },
  methods: {
    back() {
      router.push({ name: 'list', params: { id: this.$route.params.id } });
    },
    async save() {
      const form = new FormData(
        document.getElementById('UploadForm') as HTMLFormElement
      );

      form.append('title', this.title);
      form.append('content', this.content);
      form.append('author', this.$store.state.me.me.name);
      form.append('authorEmail', this.$store.state.me.me.email);
      form.append('groupId', this.$route.params.id);

      if (!this.title) {
        this.$snackbar.warn('제목을 모두 입력해주세요');
        return;
      }

      try {
        const data = await axios.post('http://localhost:8080/board', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.$snackbar.success('글이 등록되었습니다!');
        router.push({ path: `/list/${this.$route.params.id}` });
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
    uploadImage: function (event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageData = e.target.result as string;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.save {
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
    justify-content: flex-end;
  }
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
</style>