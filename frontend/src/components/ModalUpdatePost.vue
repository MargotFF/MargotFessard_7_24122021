<template>
  <div class="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <div name="header">
              Modifier ma publication
            </div>
          </div>
          <div class="modal-body">
            <div name="body">
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
                <button @click.prevent="onSubmit">Modifier</button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div name="footer">
              <button class="modal-default-button" @click="$emit('close')">Fermer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ModalUpdatePost',
    props: {
    post: Object
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
        this.$emit('updated', params)
      }
    }
  }
</script>

<style lang="scss">
</style>