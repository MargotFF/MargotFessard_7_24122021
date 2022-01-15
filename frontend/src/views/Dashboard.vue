<template>
  <div class="container">
    <Navbar></Navbar>
    <div>
      <h1>Mon Groupomania</h1>
      <h2>Un nouveau gif à partager ?</h2>
      <div class="new-post">
        <iframe src="https://giphy.com/embed/fM2As3ApmcwggaYWXG" width="150" height="150" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
        <FormCreatePost @created="createPost"></FormCreatePost>
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
        <div class="comments" v-for="comment in comments" :key="comment.id">
          <Comments :comment="comment"></Comments>
        </div>
        <button @click="displayOnePost(post.id)">Voir</button>
        <ModalGetPost v-if="showModalGetOne" @close="showModalGetOne = false" :post="onePost"></ModalGetPost>
        <button @click="displayUpdatedPost(post.id)">Modifier</button>
        <ModalUpdatePost v-if="showModalUpdate" @close="showModalUpdate = false" :post="onePost"></ModalUpdatePost>
        <button @click="deletePost(post.id)">Supprimer</button>
       </div>
    </div>
  </div>
</template>

<script>
  import Navbar from '../components/Navbar.vue'
  import FormCreatePost from '../components/FormCreatePost.vue'
  import ModalGetPost from '../components/ModalGetPost.vue'
  import ModalUpdatePost from '../components/ModalUpdatePost.vue'
  import Comments from '../components/Comments.vue'
  import { dateFormat } from '../utils/index'
  import axios from 'axios'

  export default {
    name: 'Dashboard',
    components: { 
      Navbar,
      FormCreatePost,
      ModalGetPost,
      ModalUpdatePost,
      Comments
    },
    data() {
      return {
        posts: [],
        onePost: {},
        showModalGetOne: false,
        showModalUpdate: false,
        comments: [],
        comment: {}
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
      },
      updatePost(id) {
        const token = JSON.parse(localStorage.getItem('groupomania:token'))
        axios.put(`http://localhost:3000/api/posts/${id}`, {
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
       displayUpdatedPost(id) {
        this.showModalUpdate = true
        this.getOnePost(id)
      },
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
    },
    mounted() {
      this.getPosts()
    }
  }
</script>
