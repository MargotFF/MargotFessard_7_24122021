<template>
  <form>
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Créez votre compte Groupomania</h1>
        <!-- <div class="form-group">
            <label for="avatar">Photo de profil</label>
            <input type="file" accept="image/png, image/jpg, image/jpeg" id="avatar" class="form-control" @change="onFileSelected">
        </div> -->
        <div class="form-group">
          <label for="firstName">Prénom</label>
          <input type="text" id="firstName" class="form-control" v-model="user.firstName" placeholder="Margot" required>
        </div>
        <div class="form-group">
          <label for="lastName">Nom de famille</label>
          <input type="text" id="lastName" class="form-control" v-model="user.lastName" placeholder="Fessard" required>
        </div>
        <div class="form-group">
          <label for="userName">Pseudo</label>
          <input type="text" id="userName" class="form-control" v-model="user.userName" placeholder="MargotF" required>
        </div>
        <div class="form-group">
          <label for="jobTitle">Poste actuel</label>
          <input type="text" id="jobTitle" class="form-control" v-model="user.jobTitle" placeholder="Développeur web" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" id="email" class="form-control" v-model="user.email" placeholder="margot@groupomania.com" required>
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" class="form-control" v-model="user.password" placeholder="********" required>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <button class="btn btn-primary" @click.prevent="onSubmit">Je m'inscris !
        </button>
      </div>
      <p>Vous avez déjà un compte ? <router-link to="/connexion">Se connecter</router-link></p>
    </div>
  </form>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Signup',
    data() {
      return {
        user: {
          firstName: '',
          lastName: '',
          userName: '',
          jobTitle: '',
          email: '',
          password: '',
          isAdmin: false,
        },
      }
    },
    methods: {
      onSubmit() {
          axios.post('http://localhost:3000/api/auth/signup', this.user)
            .then((response) => {
              console.log(response.data)
              this.$router.push('/connexion')
            })
            .catch(error => console.error(error.response))
      }    
    }
  };
</script>

<style lang="scss" scoped>
</style>
