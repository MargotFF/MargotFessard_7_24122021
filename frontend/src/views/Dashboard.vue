<template>
  <div class="container">
    <Navbar/>
    <div>
      <img src="../assets/icon-left-font.png" alt="Logo Groupomania" class="red-logo-left">
      <h2>Un nouveau gif à partager ?</h2>
      <div class="new-post">
        <iframe src="https://giphy.com/embed/fM2As3ApmcwggaYWXG" width="150" height="150" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
        <FormCreatePost @postCreated="createPost"/>
      </div>
    </div>
    <div>
      <h2>Mon feed de publications</h2>
       <i class="fas fa-users"></i>
       <div v-for="post in posts" :key="post.id">
        <p>{{ post.user.userName }}</p>
        <p>{{ post.message }}</p>
        <img :src="post.imageUrl" alt="">
        <p>Publié le {{ dateFormat(post.createdAt) }}</p>
        <p v-if="post.countComments <= 1">{{ post.countComments }} commentaire</p>
        <p v-else>{{ post.countComments }} commentaires</p>
        <button @click="displayOnePost(post.id)">Voir</button>
        <ModalGetPost 
          v-if="showModalGetOne"
          @commentCreated="createComment"
          @commentDeleted="deleteComment"
          @close="closeOnePost" 
          :post="onePost" 
          :comments="comments"/>
        <button v-show="canUpdate(post.user.id)" @click="displayUpdatedPost(post.id)">Modifier</button>
        <ModalUpdatePost 
          v-if="showModalUpdate" 
          @postUpdated="updatePost" 
          @close="showModalUpdate = false" 
          :post="onePost"/>
        <button v-show="canDelete(post.user.id)" @click="deletePost(post.id)">Supprimer</button>
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
  .red-logo-left {
    width: 60%;
  }
</style>