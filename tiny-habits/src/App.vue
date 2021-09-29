<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Board</router-link> |
      <router-link to="/surveys">Surveys</router-link> |
      <router-link to="/seeds">Seeds</router-link>
      <v-avatar style="position: absolute; right: 20px; top 0px;">
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-avatar>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      // color: #42b983;
      color: #5fd82e;
    }
  }
}
</style>
