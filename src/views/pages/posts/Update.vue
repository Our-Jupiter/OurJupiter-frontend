<template>
    <div class="update">
        <div class="col-md-4">
            <form id="UploadForm" enctype=”multipart/form-data” name="upload">
                <div class="form-group">
                    <BaseInput v-model= "title" type="text" class="form-control" id="title" label="제목"></BaseInput>
                </div>
                <div class="form-group">
                    <BaseInput type="text" v-model= "author" class="form-control" id="author" label="작성자">postData.author</BaseInput>
                </div>
                <div class="form-group">
                    <textarea v-model= "content" class="form-control" id="content" placeholder="내용을 입력하세요"></textarea>
                </div>
                <div class="form-group">
                        <div class="custom-file" id="inputFile">
                            <label class="custom-file-label" for="customFile">파일을 선택해 주세요.</label>
                            <input name="file" type="file" class="custom-file-input" id="customFile" ref="file" @change="previewImage">
                        </div>
                    <div class="image-preview" v-if="imageData.length > 0">
                    <img class="preview" :src="imageData" width="50%" height="50%">
                    </div>
                </div>
            </form>
            <a href="/" role="button" class="btn btn-secondary">취소</a>
            <BaseButton @click="update">등록</BaseButton>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import router from '@/router';

export default Vue.extend({
    name: 'Update',
    created() {
    this.getData();
    },
    data() {
        return {
        image: '',
        imageData: '',
        title:'',
        author:'',
        content:'',
        };
    },
    methods: {
        async getData() {
            try {
            const id = this.$route.params.id;
            const data = await axios.get(
            'http://localhost:8080/api/v1/posts/' + id
            );
            this.title = data.data.title;
            this.author = data.data.author;
            this.content = data.data.content;

            const fileId = data.data.fileId;
            this.imageData = 'http://localhost:8080/api/v1/posts/file/' + fileId;
        } catch (err) {
            this.$snackbar.error(err.response.data.message);
        }
        },
        previewImage: function(event:any) {
            const input = event.target;
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imageData = e.target.result as string;
                };
                reader.readAsDataURL(input.files[0]);
            }
        },
        async update() {
            const id = this.$route.params.id;
            const form = new FormData(document.getElementById('UploadForm') as HTMLFormElement);

            form.append('title', this.title);
            console.log(this.author);
            form.append('content',this.content);
            form.append('author',this.author);

            if (!this.title || !this.author) {
                this.$snackbar.warn('제목과 작성자를 모두 입력해주세요');
                return;
            }

            try{
                const data = await axios.put('http://localhost:8080/api/v1/posts/'+ id, form, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                this.$snackbar.success('글이 수정되었습니다!');
                router.push({ path: '/detail/'+id });
            }catch (err) {
                this.$snackbar.error(err.response.data.message);
            }

        }
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
}
</style>