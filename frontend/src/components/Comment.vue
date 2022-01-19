<template>
  <div class="comment">
    <div class="comment-left">
      <img v-if="comment.user.avatar" :src="comment.user.avatar" alt="Photo de profil" class="avatar post-avatar comment-avatar margin-top-0">
      <img v-else src="../assets/default-avatar.jpeg" alt="Photo de profil par défaut" class="avatar post-avatar comment-avatar margin-top-0">
    </div>
    <div class="comment-body">
      <div class="comment-body-top">
        <p class="bold-text margin-bottom-0 padding-right">{{ comment.user.userName }}</p>
        <p class="post-content-date margin-bottom-0">le {{ dateFormat(comment.createdAt) }}</p>
      </div>
      <p class="margin-top-0 margin-bottom-0">{{ comment.content }}</p>
    </div>
  </div>  
</template>

<script>
import { dateFormat } from '../utils/index'

export default {
  name: 'Comment',
  props: {
    comment: Object
  },
  methods: {
    dateFormat
  }
}
</script>

<style lang="scss">
  .comment {
    display: flex;
    background-color: #F7F7F7;
    border-radius: 3px;
    padding: 12px 8px;
    margin-bottom: 4px;
    width: 94%;
    &-left {
      display: flex;
      .comment-avatar {
        margin-right: 10px !important;
        width: 38px !important;
        height: 38px !important;
      }
    }
    &-body {
      display: flex;
      flex-direction: column;
      width: 100%;
      &-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
          margin: 0;
        }
      }
    }
  }
  .margin-top-0 {
    margin-top: 0 !important;
  }
  .padding-right {
    padding-right: 10px;
  }
</style>


