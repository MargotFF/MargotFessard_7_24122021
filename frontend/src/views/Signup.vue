<template>
  <div class="padding-top-page page-height-signup">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <img class="logo-icon-width" src="../assets/icon.png" alt="Logo Groupomania">
        <h1>Créez votre compte <span class="red-word">Groupomania</span></h1>
        <div class="form-container">
          <form>
            <div class="form-group">
              <label for="firstName" class="bold-text">Prénom</label>
              <input type="text" id="firstName" class="form-control" v-model="user.firstName" placeholder="Margot" required>
            </div>
            <div class="form-group">
              <label for="lastName" class="bold-text">Nom de famille</label>
              <input type="text" id="lastName" class="form-control" v-model="user.lastName" placeholder="Fessard" required>
            </div>
            <div class="form-group">
              <label for="userName" class="bold-text">Pseudo</label>
              <input type="text" id="userName" class="form-control" v-model="user.userName" placeholder="MargotF" required>
            </div>
            <div class="form-group">
              <label for="jobTitle" class="bold-text">Poste actuel</label>
              <input type="text" id="jobTitle" class="form-control" v-model="user.jobTitle" placeholder="Développeur web" required>
            </div>
            <div class="form-group">
              <label for="email" class="bold-text">Email</label>
              <input type="text" id="email" class="form-control" v-model="user.email" placeholder="margot@groupomania.com" required>
            </div>
            <div class="form-group">
              <label for="password" class="bold-text">Mot de passe</label>
              <input type="password" id="password" class="form-control" v-model="user.password" placeholder="***********" required>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row margin-bottom">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <button class="btn-margin-y" @click.prevent="onSubmit">Je m'inscris !
        </button>
      </div>
      <p>Vous avez déjà un compte ? <router-link to="/connexion"><span class="red-word red-link bold-text underline-text">Se connecter</span></router-link></p>
    </div>
  </div>
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
  .page-height-signup {
    min-height: calc(140.8vh - 100px);
  }
  @media (min-width: 520px) and (max-width: 730px) {
    .page-height-signup {
      min-height: calc(140.8vh - 80px);
    }
  }
</style>
