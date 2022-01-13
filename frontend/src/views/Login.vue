<template>
  <section>
    <form>
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <h1>Se connecter à Groupomania</h1>
          <hr>
          <div class="form-group">
            <label for="email">Email ou pseudo</label>
            <input type="text" id="email" class="form-control" v-model="user.email">
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" class="form-control" v-model="user.password">
          </div>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <button class="btn btn-primary" @click.prevent="onSubmit">Je me connecte !
          </button>
          <p>Vous n'avez pas encore de compte ? <router-link to="/inscription">S'inscrire</router-link></p>
        </div>
      </div>
    </form>
  </section>
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
          .catch(error => console.error(error.response))
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>
