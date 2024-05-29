<template>
  <div>
    <!-- {{ $store.state.user.name }} -->
    <h1> Create an Event, {{ user.name }}</h1>
    <p> This event was created by {{ user.id }} </p>
    <ul>
      <li v-for="(cat, index) in categories" :key="cat + index"> {{ cat }} </li>
    </ul>
    <p> There are {{ catLength }} categories </p>ghe
    
    <p> There are {{ catLengthGetter }} cat length getter </p>
    <p> Dynamic param {{ dynamicParams(3)  }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  // computed: {
  //   userName() {
  //     return this.$store.state.user
  //   } 
  // }
  // computed: mapState({
  //   user: state => state?.user,
  //   categories: state => state?.categories
  // })
  computed: {
    // catLength() {
    //   return this.$store.getters.catLength
    // },
    // catLengthGetter() {
    //   return this.$store.getters.catLengthGetter
    // },
    // dynamicParams() {
    //   return this.$store.getters.dynamicParams
    // },
    ...mapGetters(['catLength', 'catLengthGetter', 'dynamicParams']),
    ...mapState(['user', 'categories'])
}
  }
</script>

<style>

</style>