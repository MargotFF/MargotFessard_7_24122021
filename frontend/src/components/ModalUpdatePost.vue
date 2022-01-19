<template>
  <div class="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container modal-container-update">
          <div class="modal-header text-center">
            <h2 class="full-width margin-bottom-0">Modifier ma publication</h2>
          </div>
          <div class="modal-body text-center">
            <div class="form-container form-update-post margin-top-0">
              <div class="form-group">
                <label for="message" class="bold-text">Mon message</label>
                <input type="text" id="message" class="form-control" v-model="postUpdate.message" required>
              </div>
              <div class="form-group">
                <button @click="uploadFile" type="button" class="btn-invisible"></button>
                <label for="imageUrl"></label>
                <input type="file" ref="fileUpload" @change="onFileSelected" accept="image/*" id="imageUrl" class="form-control">
              </div>
              <button @click.prevent="onSubmit">Mettre à jour</button>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="$emit('close')">Fermer</button>
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
  .modal-container-update {
    height: calc(100vh - 48%);
    overflow-y: auto;
  }
  .form-update-post {
    width: 80%;
  }
</style>