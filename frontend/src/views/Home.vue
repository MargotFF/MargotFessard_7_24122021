<template>
  <section class="hero page-height">
    <div class="hero-body">
      <div class="container">
        <img src="../assets/icon-above-font.png" alt="Logo Groupomania" class="red-logo-above">
        <h2 class="subtitle">Le réseau social des employés fait par des employés</h2>
        <button class="btn-margin-right-lg"><router-link to="/inscription">Je m'inscris</router-link></button>
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

<style lang="scss">
  .hero {
    margin-top: 40px;
    text-align: center;
  }
  .hero-body .title {
    font-size: 60px;
    margin: 0 auto;
  }
  .subtitle {
    font-size: 30px;
    margin: 0 0 60px 0;
  }
  .red-logo-above {
    width: 50%;
  }
  @media (max-width: 768px) {
    .subtitle {
      font-size: 24px;
    }
  }
</style>
