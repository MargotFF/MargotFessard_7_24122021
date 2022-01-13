<template>
  <div class="container">
    <Navbar></Navbar>
    <div v-show="!showForm">
      <h1>Mon profil Groupomania</h1>
      <h2>Bienvenue {{ user.firstName }} {{ user.lastName }} !</h2>
      <img src="../assets/default-avatar.jpeg" alt="avatar">
      <p>Pseudo : {{ user.userName }}</p>
      <p>Poste actuel : {{ user.jobTitle }}</p>
      <p>Email : {{ user.email }}</p>
    </div>
    <div v-show="showForm">
    <h1>Mes informations</h1>
      <div class="form-group">
          <label for="avatar">Photo de profil</label>
          <input type="file" accept="image/png, image/jpg, image/jpeg" id="avatar" class="form-control">
      </div>
      <div class="form-group">
        <label for="firstName">Prénom</label>
        <input type="text" id="firstName" class="form-control" v-model="user.firstName" required>
      </div>
      <div class="form-group">
        <label for="lastName">Nom de famille</label>
        <input type="text" id="lastName" class="form-control" v-model="user.lastName" required>
      </div>
      <div class="form-group">
        <label for="userName">Pseudo</label>
        <input type="text" id="userName" class="form-control" v-model="user.userName" required>
      </div>
      <div class="form-group">
        <label for="jobTitle">Poste actuel</label>
        <input type="text" id="jobTitle" class="form-control" v-model="user.jobTitle" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" id="email" class="form-control" v-model="user.email" required>
      </div>
      <div class="form-group">
        <label for="newPassword">Nouveau mot de passe</label>
        <input type="password" id="newPassword" class="form-control" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$">
      </div>
    </div>
    <button @click="displayForm()">{{ showForm ? "Annuler les modifications" : "Modifier mon profil" }}</button>
    <button v-show="showForm" @click="updateProfile()">Mettre à jour mon profil</button>
    <button v-show="!showForm" @click="deleteProfile()">Supprimer mon compte</button>
  </div>
</template>

<script>
  import Navbar from '../components/Navbar.vue'
  import axios from 'axios'
  export default {
    name: 'Profile',
    components: { Navbar },
    data() {
      return {
        user: {},
        showForm: false
      }
    },
    mounted() {
      const token = JSON.parse(localStorage.getItem('groupomania:token'))
      axios.get('http://localhost:3000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          console.log(response.data)
          this.user = response.data
        })
        .catch(error => console.error(error.response));
    },
    methods: {
      displayForm() {
        this.showForm = !this.showForm
      },
      updateProfile() {
        const newPassword = document.getElementById('newPassword').value;
        let data;

        if (newPassword === "") {
          data = {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            userName: this.user.userName,
            jobTitle: this.user.jobTitle,
            email: this.user.email
          };
        } else {
          data = {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            userName: this.user.userName,
            jobTitle: this.user.jobTitle,
            email: this.user.email,
            newPassword: newPassword
          };
        }

        const token = JSON.parse(localStorage.getItem('groupomania:token'));
        axios.put('http://localhost:3000/api/auth/profile', data,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
          .then(response => {
            console.log(response.data)
            this.user = response.data
            this.showForm = false
          })
          .catch(error => console.error(error.response))
      },
      deleteProfile() {
        const token = JSON.parse(localStorage.getItem('groupomania:token'))
        axios.delete('http://localhost:3000/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            console.log(response)
            localStorage.clear()
          })
          .then(this.$router.push('/'))
          .catch(error => console.error(error.response))
      }
    },
  }
</script>

<style lang="css" scoped>
</style>