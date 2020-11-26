<template>
  <div class="certification">
      <h1>오늘의 인증</h1>
      <div class="form">
      <form id="CertificationForm" enctype=”multipart/form-data” name="certification">
        <div class="form-group">
          <BaseInput type="text" v-model= "author" class="form-control" id="author" label="작성자" :placeholder="$store.state.me.me.name" disabled />
        </div>
        <div class="form-group">
          <BaseInput type="text" v-model= "today" class="form-control" id="author" label="오늘 날짜" :placeholder="today" disabled />
        </div>
        <br>
        <br>
        <div class="form-group">
          <div class="custom-file" id="inputFile">
            <label class="custom-file-label" for="customFile">파일을 선택해 주세요. </label>
            <input name="file" type="file" class="custom-file-input" id="customFile" ref="file" @change="previewImage">
          </div>
          <div class="image-preview" v-if="imageData.length > 0">
            <img class="preview" :src="imageData" width="50%" height="50%">
          </div>
        </div>
      </form>
      </div>
      <div class="button">
        <BaseButton @click="back()">취소</BaseButton>
        <BaseButton @click="createCertification">등록</BaseButton>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import router from '@/router';

export default Vue.extend({
  name: 'CertificationCreate',
  data() {
    return {
      author: '',
      today: '',
      groupId:'',
      imageData: '',
    };
  },
  beforeMount() {
    this.today = new Date().toLocaleDateString();
  },
  computed: {
    headers(): object {
      const token = localStorage.getItem('token');
      return token ? { 'x-access-token': token } : {};
    },
  },
  methods: {
      back() {
      router.push({ name: 'groupMain', params: { id: this.$route.params.groupId}, query: {groupName: this.$route.query.groupName} });
    },
    async createCertification() {
      const form = new FormData(
        document.getElementById('CertificationForm') as HTMLFormElement
      );
      form.append('todayDate',this.today);
      form.append('groupId',this.$route.params.groupId);
      form.append('userId',this.$store.state.me.me.name);

      try {
        const data = await axios.post('http://localhost:8080/certification', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });
        this.$snackbar.success('오늘 인증을 완료하였습니다!');
        router.push({ name: 'groupMain', params: { id: this.$route.params.groupId}, query: {groupName: this.$route.query.groupName} });
      } catch (err) {
        this.$snackbar.error(err.response.data.message);
      }
    },
      previewImage: function(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageData = e.target.result as string;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
  }
});
</script>

<style lang="scss" scoped>
.certification {
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
