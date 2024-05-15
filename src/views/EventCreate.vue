<template>
  <div>
    {{ userName }}
  </div>
</template>

<script>
export default {
  computed: {
    userName() {
      return this.$store.state.user
    } 
  }
}
</script>

<style>

</style>