<template>
  <div class="footer">
    <div class="footer-body">
      <a href="#">Besoin d'aide ?</a>
      <a href="#">Conditions générales</a>
      <a href="#">Politique de confidentialité</a>
    </div>
    <div class="footer-logo">
      <img src="../assets/icon-left-font-black.png" alt="Logo Groupomania">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>

<style lang="scss">
  .footer {
    background: #FFD6D7;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3.5em;
    padding: 0px 50px;
     .footer-body {
      display: flex;
      align-items: center;
      a {
        font-size: 14px;
        padding-right: 40px;
        &:hover {
          opacity: 0.7;
        }
      }
     }
    .footer-logo {
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      img {
        width: 8em;
      }
    }
  }
  @media (max-width: 600px) {
    .footer {
      flex-direction: column;
      padding: 15px 0 5px 0;
      height: auto;
      .footer-body {
        flex-direction: column;
        a {
          margin: 3px 0 3px 0;
          padding-right: 0;
        }
      }
      &-logo {
        display: block !important;
        img {
          padding: 12px 0;
        }
      }
    }
  }
</style>
