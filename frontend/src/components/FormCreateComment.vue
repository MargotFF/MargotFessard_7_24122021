<template>
  <div class="comment-form">
    <div class="form-group full-width">
      <label for="content"></label>
      <input type="text" id="content" class="form-control" v-model="content" placeholder="Votre commentaire..." required>
    </div>
    <button class="comment-form-btn" @click.prevent="onSubmit">Envoyer</button>
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
  .comment-form {
    display: flex;
    .form-group {
      .form-control {
        width: 100%;
        border: 1px solid #e3e3e3;
        padding: 10px;
      }
    }
    &-btn {
      border-radius: 0;
      padding: 0;
      margin: 0;
      padding: 0 15px;
      font-size: 13px;
      &:hover {
        background-color: white;
      }
    }
  }
</style>