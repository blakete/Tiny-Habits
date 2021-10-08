<template>
  <div id="app" data-app>
    <v-app>
      <div id="nav">
        <!-- <router-link to="/surveys">Survey</router-link> |
        <router-link to="/">Garden</router-link> |
        <router-link to="/seeds">Seeds</router-link> |
        <router-link to="/goodmorning">Goodmorning</router-link> -->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              style="position: absolute; right: 20px; top: 20px;"
              color="grey"
              dark
              outlined
              v-bind="attrs"
              v-on="on"
              icon
            >
              <!-- <v-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </v-avatar> -->
              <v-icon color="grey">mdi-sprout</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              v-on:click="menuAction(item)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- <v-icon size="48" style="position: absolute; left: 20px; top 0px;">
        mdi-cloud-check-outline
      </v-icon> -->
        <!-- <v-progress-circular
        :size="40"
        style="position: absolute; left: 20px; top 0px;"
        indeterminate
        color="green"
      ></v-progress-circular> -->
      </div>
      <router-view />
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    items: [{ title: "Settings" }, { title: "Logout" }],
  }),
  methods: {
    menuAction(item) {
      console.log(item.title);
    },
  },
};
</script>


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
