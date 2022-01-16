<template>
  <section class="hero is-dark">
    <div class="hero-body">
      <div class="container">
        <img src="../assets/icon-above-font.png" alt="Logo Groupomania" class="red-logo-above">
        <h2 class="subtitle">Le réseau social des employés fait par des employés</h2>
        <button><router-link to="/inscription">Je m'inscris</router-link></button>
        <button><router-link to="/connexion">Je me connecte</router-link></button>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Home',
  } 
</script>

<style lang="scss" scoped>
  .hero {
    text-align: center;
  }
  .hero-body .title {
    font-size: 60px;
    margin: 0 auto;
  }
  .subtitle {
    font-size: 30px;
  }
  .red-logo-above {
    width: 60%;
  }
</style>
