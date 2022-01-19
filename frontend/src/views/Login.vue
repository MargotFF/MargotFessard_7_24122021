<template>
  <div class="padding-top-page page-height">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <img class="logo-icon-width" src="../assets/icon.png" alt="Logo Groupomania">
        <h1>Se connecter à <span class="red-word">Groupomania</span></h1>
        <div class="form-container">
          <form>
            <div class="form-group">
              <label for="email" class="bold-text">Email ou pseudo</label>
              <input type="text" id="email" class="form-control" v-model="user.email">
            </div>
            <div class="form-group">
              <label for="password" class="bold-text">Mot de passe</label>
              <input type="password" id="password" class="form-control" v-model="user.password">
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <button class="btn-margin-y" @click.prevent="onSubmit">Je me connecte !
        </button>
        <p>Vous n'avez pas encore de compte ? <router-link to="/inscription"><span class="red-word red-link bold-text underline-text">S'inscrire</span></router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import VueJwtDecode from 'vue-jwt-decode'
  export default {
    name: 'Login',
    data() {
      return {
        user: {
          email: '',
          password: ''
        },
      }
    },
    methods: {
      onSubmit() {
        axios.post('http://localhost:3000/api/auth/login', this.user)
          .then((response) => {
            const decodedToken = VueJwtDecode.decode(response.data.token)
            localStorage.setItem('groupomania:user', JSON.stringify(decodedToken))
            localStorage.setItem('groupomania:token', JSON.stringify(response.data.token))
            localStorage.setItem('groupomania:admin', JSON.stringify(response.data.admin))
            this.$router.push('/groupomania')
          })
          .catch(error => {
            console.error(error.response)
            alert("Votre identifiant ou mot de passe est incorrect !")
          })
      }
    }
  };
</script>

<style lang="scss">
</style>
