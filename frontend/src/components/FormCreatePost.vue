<template>
  <div class="post-form">
    <div class="form-group">
      <i class="far fa-comment-dots"></i>
      <label for="message"></label>
      <input type="text" id="message" class="form-control" v-model="message" placeholder="Mon message" required>
    </div>
    <div class="form-group">
      <button @click="uploadFile" type="button" class="btn-invisible"></button>
      <i class="far fa-file-image"></i>      
      <label for="imageUrl"></label>
      <input type="file" ref="fileUpload" @change="onFileSelected" accept="image/*" id="imageUrl" class="form-control">
    </div>
    <button @click.prevent="onSubmit">Publier</button>
</div>
</template>

<script>
  export default {
    name: 'FormCreatePost',
    data() {
      return {
        message: '',
        imageUrl: ''
      }
    },
    methods: {
      uploadFile() {
        this.$refs.fileUpload.click()
      },
      onFileSelected(event) {
        this.imageUrl = event.target.files[0];
      },
      onSubmit() {
        const params = {
          message: this.message,
          imageUrl: this.imageUrl
        }
        this.$emit('postCreated', params)
      }
    }
  }
</script>

<style lang="scss">
  .btn-invisible {
    display: flex;
    align-items: center;
    color: #3f3d56;
    border: none;
    background-color: transparent;
    &:hover, &:focus {
        color: white;
    }
  }
</style>