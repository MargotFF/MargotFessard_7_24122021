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
                  <input type="text" id="message" class="form-control" v-model="postUpdate.message" required>
                </div>
                <div class="form-group">
                  <button @click="uploadFile" type="button" class="btn-invisible"></button>
                  <i class="far fa-file-image"></i>      
                  <label for="imageUrl"></label>
                  <input type="file" ref="fileUpload" @change="onFileSelected" accept="image/*" id="imageUrl" class="form-control">
                </div>
                <button @click.prevent="onSubmit">Mettre à jour</button>
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
    watch: {
      post: function (newValue) {
        if (newValue.id) {
          this.postUpdate.message = newValue.message
        }
      }
    },
    data() {
      return {
        postUpdate: {},
        image: null
      }
    },
    methods: {
      uploadFile() {
        this.$refs.fileUpload.click()
      },
      onFileSelected(event) {
        this.image = event.target.files[0];
      },
      onSubmit() {
        const params = {
          message: this.postUpdate.message,
          imageUrl: this.image
        }
        this.$emit('postUpdated', {params, id: this.post.id})
      }
    }
  }
</script>

<style lang="scss">
</style>