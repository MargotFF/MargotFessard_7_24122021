<template>
  <div class="form-container">
    <p id="text-margin-bottom" class="bold-text font-size-medium">Un nouveau <span class="red-word">gif</span> à partager ?</p>
    <p id="text-margin-top">Envoyez-le à vos collègues !</p>
    <div class="form-group message-margin">
      <label for="message"></label>
      <input type="text" id="message" class="form-control" v-model="message" placeholder="Mon message" required>
    </div>
    <div class="form-group image-upload-post">
      <label for="imageUrl"></label>
      <input type="file" ref="fileUpload" @change="onFileSelected" accept="image/*" id="imageUrl" class="form-control margin-bottom-0">
      <button @click="uploadFile" type="button" class="btn-invisible btn-invisible-post"></button>
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
  #text-margin-top {
    margin-top: 5px;
  }
  #text-margin-bottom {
    margin-bottom: 5px;
  }
  .margin-bottom-0 {
    margin-bottom: 0 !important;
  }
  .message-margin {
    margin: 25px 0 0 0;
  }
  .image-upload-post > input[type=file] {
    margin-bottom: 15px !important;
  }
  .btn-invisible-post {
    top: 444px;
  }
</style>