<template>
  <div id="nav">
    <router-link to="/groupomania">Mon tableau de bord</router-link> |
    <router-link to="/profil">Mon profil</router-link> |
    <router-link to="/accueil">
      <span @click="logout">Se déconnecter</span>
    </router-link>
  </div>
</template>

<script>
  import { logout } from '../utils/index'

  export default {
    name: 'Navbar',
    methods: {
      logout
    }
  }
</script>
