<template>
  <div class="hello">
    <img src="../assets/logo.png">
    <h2>{{ msg }}</h2>
    <ul>
      <li><a href="#/Only">GridManager Only</a></li>
      <li><a href="#/I18n">GridManager I18N</a></li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'GridManager by Vue'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
