<template>
  <div id="nav">
    <router-link to="/groupomania">Mon tableau de bord</router-link> |
    <router-link to="/profil">Mon profil</router-link> |
    <router-link to="/">
      <span @click="logout">Se déconnecter</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    methods: {
      logout() {
        localStorage.removeItem('groupomania:user')
        localStorage.removeItem('groupomania:token')
        this.$router.push('/')
      }
    }
  }
</script>


