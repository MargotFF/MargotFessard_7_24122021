<template>
  <Navbar></Navbar>
</template>

<script>
  import Navbar from '../components/Navbar.vue'
  // import axios from 'axios'

  export default {
    name: 'Dashboard',
    components: { Navbar },
    // data() {
    // return {
    //     user: {
    //     }
    // }
    // },
    // mounted() {
    // const token = JSON.parse(localStorage.getItem('groupomania:token'))
    // axios.get('http://localhost:3000/api/auth/profile', {
    //   headers: {
    //   'Authorization': `Bearer ${token}`
    //   }
    // })
    //   .then(response => {
    //   console.log(response.data)
    //   this.user = response.data
    //   })
    //   .catch(error => console.error(error.response))
    // }
  }
</script>
