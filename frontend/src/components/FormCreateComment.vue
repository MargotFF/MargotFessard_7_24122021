<template>
  <div class="post-form">
    <div class="form-group">
      <label for="content"></label>
      <input type="text" id="content" class="form-control" v-model="content" placeholder="Mon commentaire" required>
    </div>
    <button @click.prevent="onSubmit">Envoyer</button>
</div>
</template>

<script>
  export default {
    name: 'FormCreateComment',
    data() {
      return {
        content: ''
      }
    },
    methods: {
      onSubmit() {
        const params = {
          content: this.content
        }
        this.$emit('commentCreated', params)
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