<template>
  <div id="app">
    <header class="nav">
      <a href="#/home">GridManager Home</a>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1, h2 {
  font-weight: normal;
  padding: 10px;
  margin: 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.nav{
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 2px solid #eee;
}
a {
  color: #42b983;
}
</style>
