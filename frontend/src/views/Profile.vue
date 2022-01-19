<template>
  <div class="profile">
    <Navbar/>
    <div v-show="!showForm">
      <img class="logo-icon-width" src="../assets/icon.png" alt="Logo Groupomania">
      <h1>Mon profil <span class="red-word">Groupomania</span></h1>
      <div class="profile-data font-size-medium">
        <img v-if="user.avatar !== null" :src="user.avatar" alt="Photo de profil" class="avatar profile-avatar">
        <img v-else src="../assets/default-avatar.jpeg" alt="Photo de profil par défaut" class="avatar profile-avatar">
        <p><span class="bold-text">Prénom : </span>{{ user.firstName }}</p>
        <p><span class="bold-text">Nom : </span>{{ user.lastName }}</p>
        <p><span class="bold-text">Pseudo : </span>{{ user.userName }}</p>
        <p><span class="bold-text">Poste actuel : </span>{{ user.jobTitle }}</p>
        <p><span class="bold-text">Email : </span>{{ user.email }}</p>
      </div>
    </div>
    <div v-show="showForm">
      <h1>Mes informations</h1>
      <div class="form-container">
        <div class="form-group image-upload-profile">
          <label for="avatar" class="bold-text">Photo de profil</label>
          <input type="file" ref="fileUpload" @change="onFileSelected" accept="image/*" id="avatar" class="form-control">
          <button @click="uploadFile" type="button" class="btn-invisible btn-invisible-top"></button>
        </div>
        <div class="form-group">
          <label for="firstName" class="bold-text">Prénom</label>
          <input type="text" id="firstName" class="form-control" v-model="user.firstName" required>
        </div>
        <div class="form-group">
          <label for="lastName" class="bold-text">Nom de famille</label>
          <input type="text" id="lastName" class="form-control" v-model="user.lastName" required>
        </div>
        <div class="form-group">
          <label for="userName" class="bold-text">Pseudo</label>
          <input type="text" id="userName" class="form-control" v-model="user.userName" required>
        </div>
        <div class="form-group">
          <label for="jobTitle" class="bold-text">Poste actuel</label>
          <input type="text" id="jobTitle" class="form-control" v-model="user.jobTitle" required>
        </div>
        <div class="form-group">
          <label for="email" class="bold-text">Email</label>
          <input type="text" id="email" class="form-control" v-model="user.email" required>
        </div>
        <div class="form-group">
          <label for="newPassword" class="bold-text">Nouveau mot de passe</label>
          <input type="password" id="newPassword" class="form-control" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$">
        </div>
      </div>
    </div>
    <button id="btn-cancel-responsive" class="btn-margin-right-lg" @click="displayForm()">{{ showForm ? "Annuler les modifications" : "Modifier mon profil" }}</button>
    <button id="btn-update-responsive" class="btn-margin" v-show="showForm" @click="updateProfile()">Mettre à jour mon profil</button>
    <button class="btn-margin" v-show="!showForm" @click="deleteProfile()">Supprimer mon compte</button>
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
  .profile-data {
    margin: 30px 0;
  }
  .profile-avatar {
    width: 15em;
    height: 15em;
    border: white 3px solid;
  }
  .image-upload-profile > input[type=file] {
    margin-top: 8px;
  }
  .btn-invisible-profile {
    top: 256px;
  }
  @media (max-width: 530px) {
    .profile-avatar {
      width: 10em;
      height: 10em;
      border: white 3px solid;
    }
    #btn-cancel-responsive{
      margin: 20px 0 0 0 !important;
    }
    #btn-update-responsive{
      margin: 20px 0 20px 0 !important;
    }
  }
</style>