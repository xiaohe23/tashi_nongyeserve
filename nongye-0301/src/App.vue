<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<style lang="scss">
  * {
  padding: 0;
  margin: 0;
}
ul,
li {
  list-style: none;
}
a {
  text-decoration: none;
}
html,
body,
#app {
  height: 100%;
  
}
body{
  min-width: 700px;
  max-height: 1200px;
}

</style>
