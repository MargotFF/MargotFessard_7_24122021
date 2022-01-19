<template>
  <div class="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
              <img v-if="post.user?.avatar" :src="post.user?.avatar" alt="Photo de profil" class="avatar modal-header-avatar">
              <img v-else src="../assets/default-avatar.jpeg" alt="Photo de profil par défaut" class="avatar modal-header-avatar">
              <p class="bold-text font-size-medium">{{ post.user?.userName }} </p>
              <p class="post-content-date">le {{ dateFormat(post.createdAt) }}</p>
          </div>
          <div class="modal-body">
            <div class="modal-post-body">
              <p class="post-content-message font-size-medium">{{ post.message }}</p>
              <img v-show="post.imageUrl" :src="post.imageUrl" alt="Image publiée" class="modal-post-img">
            </div>
            <div class="delimiter"></div>
            <h2 class="font-size-medium">Commentaires</h2>
            <div class="comments" v-for="comment in comments" :key="comment.id">
              <Comment :comment="comment"/>
              <button v-show="canDelete(comment.user.id)" @click="onDelete(comment.id)" class="icon-btn"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div>
              <FormCreateComment @commentCreated="onCommentCreated"/>
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
import Comment from '../components/Comment.vue'
import FormCreateComment from '../components/FormCreateComment.vue'
import { dateFormat, canDelete } from '../utils/index'

export default {
  name: 'ModalGetPost',
  components: {
    Comment,
    FormCreateComment
  },
  props: {
    post: Object,
    comments: Array
  },
  methods: {
    dateFormat,
    canDelete,
    onDelete(id) {
      this.$emit('commentDeleted', id)
    },
    onCommentCreated(params) {
      this.$emit('commentCreated', params)
    }
  }
}
</script>

<style lang="scss">
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    display: table;
    transition: opacity 0.3s ease;
  }
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  .modal-container {
    width: 70%;
    // max-height: 90%;
    height: calc(100vh - 10%);
    overflow-y: auto;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }
  .modal-header {
    display: flex;
    align-items: center;
    &-avatar {
      width: 50px;
      height: 50px;
      border: white 1px solid;
      margin-right: 10px;
    }
  }
  .modal-body {
    margin: 20px 0;
  }
  .modal-post-img {
    width: 50%;
  }
  .delimiter {
    margin-top: 30px;
    margin-bottom: 15px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .comments {
    margin-bottom: 20px;
    display: flex;
  }
  .icon-btn {
    border: none;
    font-size: 13px;
    background-color: transparent;
    text-shadow: none;
    padding: 0;
    float: right;
    margin-left: 10px;
    &:hover {
      border: none;
      color: #FD2E02;
    }
  }
  .modal-footer {
    text-align: center;
  }
</style>


