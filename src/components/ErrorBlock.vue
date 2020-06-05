<template>
  <p v-if="errors.length">
    <b>Пожалуйста, исправьте указанные ошибки:</b>
    <ul>
      <li v-for="error in errors" v-bind:key='error'>{{ error }}</li>
    </ul>
  </p>
</template>

<script>
export default {
  name: 'ErrorBlock',
  props: ['errors'],
}
</script>

<style lang="css" scoped>
</style>
