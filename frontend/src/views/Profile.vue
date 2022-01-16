<template>
  <div class="container">
    <Navbar/>
    <div v-show="!showForm">
      <img src="../assets/icon.png" alt="Logo Groupomania" class="logo-icon">
      <div class="profile">
        <img v-if="user.avatar !== null" :src="user.avatar" alt="avatar">
        <img v-else src="../assets/default-avatar.jpeg" alt="avatar par défaut">
        <h2>Mon profil Groupomania</h2>
        <p>Prénom : {{ user.firstName }}</p>
        <p>Nom : {{ user.lastName }}</p>
        <p>Pseudo : {{ user.userName }}</p>
        <p>Poste actuel : {{ user.jobTitle }}</p>
        <p>Email : {{ user.email }}</p>
      </div>
    </div>
    <div v-show="showForm">
      <h1>Mes informations</h1>
      <div class="form-group">
      <button @click="uploadFile" type="button" class="btn-invisible"></button>
      <label for="avatar">Photo de profil</label>
      <input type="file" ref="fileUpload" @change="onFileSelected" accept="image/*" id="avatar" class="form-control">
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
        avatar: '',
        showForm: false
      }
    },
    methods: {
      getProfile() {
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
      displayForm() {
        this.showForm = !this.showForm
      },
      uploadFile() {
        this.$refs.fileUpload.click()
      },
      onFileSelected(event) {
        this.avatar = event.target.files[0];
      },
      updateProfile() {
        const newPassword = document.getElementById('newPassword').value;

        const formData = new FormData();
        if (newPassword !== '') {
          formData.append("newPassword", newPassword)
        }
        if (this.avatar) {
          formData.append("imageUrl", this.avatar);
        }
        formData.append("firstName", this.user.firstName);
        formData.append("lastName", this.user.lastName);
        formData.append("userName", this.user.userName);
        formData.append("jobTitle", this.user.jobTitle);
        formData.append("email", this.user.email);

        const token = JSON.parse(localStorage.getItem('groupomania:token'))
        axios.put(`http://localhost:3000/api/auth/profile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            console.log(response)
            this.user = response.data
            this.getProfile()
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
          .then(this.$router.push('/accueil'))
          .catch(error => console.error(error.response))
      }
    },
    mounted() {
      this.getProfile()
    }
  }
</script>

<style lang="scss">
  .logo-icon {
    width: 10%;
  }
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