<template>
  <div id="blog">
    <item></item>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex'
  import Item from '../components/blogs/Item.vue'

  export default {
    components: {
      Item
    }
  }
</script>

<style scoped>
  #blog{
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    padding-bottom: 50px;
  }
</style>
