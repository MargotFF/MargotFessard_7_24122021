<template>
  <div id="app">
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Footer from './components/Footer.vue'

export default {
  components: {
    Footer
  }
}
</script>

<style lang="scss">
  a {
    text-decoration: none;
    color: #2c3e50;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .page-height {
    min-height: calc(100vh - 100px);
  }
  .full-width {
    width: 100%;
  }
  .padding-top-page {
    padding-top: 30px;
  }
  .logo-icon-width {
    width: 8%;
  }
  .red-word {
    color: #FD2E02;
  }
  .font-size-medium {
    font-size: 18px;
  }
  .bold-text {
    font-weight: 600;
  }
  .text-center {
    text-align: center;
  }
  .underline-text {
    text-decoration: underline;
  }
   button {
    display: inline-block;
    margin: 0 0.1em 0.1em 0;
    border: 0.16em solid rgba(255,255,255,0);
    border-radius: 2em;
    font-size: 16px;
    font-weight: 600;
    background-color: #FFD6D7;
    text-shadow: 0 0.04em 0.04em rgba(0,0,0,0.35);
    text-align: center;
    transition: all 0.5s;
    padding: 0.5em 1.2em;
    &:hover {
      background-color: transparent;
      border: 0.16em solid #FFD6D7;
    }
  }
  .btn-margin {
    margin: 20px 0 70px 0;
  }
  .btn-margin-right-lg {
    margin-right: 20px;
  }
  .btn-margin-right-sm {
    margin-right: 6px;
  }
  .btn-margin-y {
    margin: 20px 0 10px 0;
  }
  .red-link {
    transition: all 0.3s;
    &:hover {
      color: #2c3e50;
    }
  }
  .form-container {
    width: 30%;
    margin: 38px auto 0 auto;
    padding: 24px 35px 18px 35px;
    box-shadow: 0 0 15px rgba(0,0,0,0.2);  
    .form-group {
      display: flex;
      flex-direction: column;
    }  
    input {
      margin-bottom: 15px;
      padding: 6px 16px;
      box-sizing: border-box;
      margin-left: auto;
      margin-right: auto;
    }
    input[type=text], input[type=password] {
      height: 32px;
      width: 90%;
      border: none;
      background-color: rgba(255, 214, 215, 0.5);
    }
  }
  .btn-invisible {
    display: flex;
    position: absolute;
    border: none;
    background-color: transparent;
    &:hover, &:focus {
        border: none;
        background-color: transparent;
    }
  }
  .avatar {
    border-radius: 50%;
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
    object-fit: cover;
  }
  .label-text {
    font-size: 0;
  }
  @media (max-width: 1024px) {
    .form-container {
      width: 60%;
    }
  }
  @media (max-width: 480px) {
    .form-container {
      width: 70%;
    }
  }
</style>
