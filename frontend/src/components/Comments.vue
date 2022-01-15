<template>
  <div class="comment">
    <p>{{ comment.user.userName }}</p>
    <p>{{ dateFormat(comment.createdAt) }}</p>
    <p>{{ comment.content }}</p>
  </div>  
</template>

<script>
import { dateFormat } from '../utils/index'

export default {
  name: 'Comments',
  props: {
    comment: Object
  },
  methods: {
    dateFormat
  }
}
</script>

<style lang="scss">
</style>


