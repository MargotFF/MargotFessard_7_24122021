<template>
  <div class="container">
    <Navbar/>
    <div>
      <img class="logo-icon-width" src="../assets/icon.png" alt="Logo Groupomania">
      <h1>Mon <span class="red-word">feed</span> de publications</h1>
    </div>
    <FormCreatePost @postCreated="createPost"/>
    <i class="fas fa-users"></i>
    <div class="posts-list">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <div>
          <img v-if="post.user.avatar" :src="post.user.avatar" alt="Photo de profil" class="avatar post-avatar">
          <img v-else src="../assets/default-avatar.jpeg" alt="Photo de profil par défaut" class="avatar post-avatar">
        </div> 
        <div class="post-content">
          <p class="bold-text font-size-medium post-content-top">{{ post.user.userName }}<span class="post-content-date">le {{ dateFormat(post.createdAt) }}</span></p>
          <p class="post-content-message font-size-medium">{{ post.message }}</p>
          <img v-show="post.imageUrl" :src="post.imageUrl" alt="Image publiée" class="post-content-img">
          <p v-if="post.countComments <= 1" class="post-content-bottom">{{ post.countComments }} commentaire</p>
          <p v-else class="post-content-bottom">{{ post.countComments }} commentaires</p>
          <button @click="displayOnePost(post.id)" class="btn-margin-right-sm">Voir</button>
          <ModalGetPost 
            v-if="showModalGetOne"
            @commentCreated="createComment"
            @commentDeleted="deleteComment"
            @close="closeOnePost" 
            :post="onePost" 
            :comments="comments"/>
          <button v-show="canUpdate(post.user.id)" @click="displayUpdatedPost(post.id)" class="btn-margin-right-sm">Modifier</button>
          <ModalUpdatePost 
            v-if="showModalUpdate" 
            @postUpdated="updatePost" 
            @close="showModalUpdate = false" 
            :post="onePost"/>
          <button v-show="canDelete(post.user.id)" @click="deletePost(post.id)">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from '../components/Navbar.vue'
  import FormCreatePost from '../components/FormCreatePost.vue'
  import ModalGetPost from '../components/ModalGetPost.vue'
  import ModalUpdatePost from '../components/ModalUpdatePost.vue'
  import { dateFormat, canUpdate, canDelete } from '../utils/index'
  import axios from 'axios'

  export default {
    name: 'Dashboard',
    components: { 
      Navbar,
      FormCreatePost,
      ModalGetPost,
      ModalUpdatePost
    },
    data() {
      return {
        posts: [],
        onePost: {},
        showModalGetOne: false,
        showModalUpdate: false,
        comments: [],
      }
    },
    methods: {
      createPost(params) {
        const formData = new FormData();
        formData.append("message", params.message);
        formData.append("imageUrl", params.imageUrl);

        const token = JSON.parse(localStorage.getItem('groupomania:token'))

        axios.post('http://localhost:3000/api/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        })
          .then((response) => {
            console.log(response.data)
            this.getPosts()
          })
          .catch(error => console.error(error.response))
      },
      dateFormat,
      getPosts() {
        const token = JSON.parse(localStorage.getItem('groupomania:token'))
        axios.get('http://localhost:3000/api/posts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            console.log(response)
            this.posts = response.data
            this.getComments()
          })
          .catch(error => console.error(error.response))
      },
      getOnePost(id) {
        const token = JSON.parse(localStorage.getItem('groupomania:token'))
        axios.get(`http://localhost:3000/api/posts/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            console.log(response)
            this.onePost = response.data
          })
          .catch(error => console.error(error.response))
      },
      displayOnePost(id) {
        this.showModalGetOne = true
        this.getOnePost(id)
        this.getComments(id)
      },
      closeOnePost() {
        this.showModalGetOne = false
        this.getPosts()
      },
      canUpdate,
      updatePost({id, params}) {
        const formData = new FormData();
        formData.append("message", params.message);
        formData.append("imageUrl", params.imageUrl);

        const token = JSON.parse(localStorage.getItem('groupomania:token'))
        axios.put(`http://localhost:3000/api/posts/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            console.log(response)
            this.onePost = response.data
            this.getPosts()
          })
          .catch(error => console.error(error.response))
      },
       displayUpdatedPost(id) {
        this.showModalUpdate = true
        this.getOnePost(id)
      },
      canDelete,
      deletePost(id) {
        const token = JSON.parse(localStorage.getItem('groupomania:token'))
        axios.delete(`http://localhost:3000/api/posts/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            console.log(response)
            alert("Votre publication est sur le point d'être supprimée !")
            this.getPosts()
          })
          .catch(error => console.error(error.response))
      },
      getComments(postId) {
        const token = JSON.parse(localStorage.getItem('groupomania:token'))
        axios.get(`http://localhost:3000/api/comments/${postId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            console.log(response)
            this.comments = response.data
          })
          .catch(error => console.error(error.response))
      },
      createComment(params) {
        const token = JSON.parse(localStorage.getItem('groupomania:token'))

        axios.post('http://localhost:3000/api/comments', { ...params, postId: this.onePost.id }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then((response) => {
            console.log(response.data)
            this.getComments(this.onePost.id)
          })
          .catch(error => console.error(error.response))
      },
      deleteComment(id) {
        const token = JSON.parse(localStorage.getItem('groupomania:token'))
        axios.delete(`http://localhost:3000/api/comments/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            console.log(response)
            this.getComments(this.onePost.id)
          })
          .catch(error => console.error(error.response))
      }
    },
    mounted() {
      this.getPosts()
    }
  }
</script>

<style lang="scss">
  .fa-users {
    margin: 40px 0;
    font-size: 25px;
  }
  .posts-list {
    margin-bottom: 50px;
  }
  .post-card {
    display: flex;
    justify-content: center;
    .post-avatar {
      width: 50px;
      height: 50px;
      border: white 1px solid;
      margin-right: 30px;
      margin-top: 18px;
    }
    .post-content {
      width: 80%;
      margin-left: 20px;
      margin-bottom: 20px;
      padding: 20px 25px;
      background-color: #F7F7F7;
      border: 1px solid #e3e3e3;
      position: relative;
      text-align: left;
      &-top {
        margin-top: 12px;
      }
      &-date {
        font-size: 14px;
        font-weight: 400;
        padding-left: 10px;
      }
      &-message {
        border-left: 5px solid #eaeaea;
        padding-left: 10px;     
      }
      &-img {
        width: 25%;
      }
      &-bottom {
        margin-bottom: 20px; 
        padding: 5px 10px;
        font-size: 14px;
        border-radius: 3px;
        border: 1px solid #C5C5C5;
        width: fit-content;
      }
    }
    .post-content::before {
      content: " ";
      position: absolute;
      top: 24px;
      left: -21px;
      border-top: 20px solid transparent;
      border-bottom: 20px solid transparent;
      border-right: 20px solid #e6e6e6;
      border-right-color: #e3e3e3;
    }
    .post-content::after {
      content: " ";
      position: absolute;
      top: 25px;
      left: -19px;
      border-top: 19px solid transparent;
      border-bottom: 19px solid transparent;
      border-right: 19px solid #fff;
      border-right-color: #F7F7F7;
    }
  }
  @media (max-width: 768px) {
    .post-content {
      width: 70% !important;
      margin-right: 10px;
    }
  }
</style>