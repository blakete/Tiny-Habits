<template>
  <div class="home">
    <div
      class="category-section"
      v-for="category in behaviorCategories"
      :key="category"
    >
      <div class="aspiration-divider">{{ category }}</div>
      <div id="container">
        <v-card
          class="seed-tile"
          :style="{ background: behavior.count == 0 ? 'inherit' : '#d1e6c9' }"
          v-for="behavior in behaviors"
          :key="behavior.id"
          v-show="
            behavior.categories.includes(category) &&
            getSelected.includes(behavior.id)
          "
        >
          <v-btn
            icon
            color="gray"
            style="position: absolute; top: 0; right: 0; z-index: 2"
          >
            <v-icon>mdi-dots-horizontal-circle-outline</v-icon></v-btn
          >
          <div
            v-ripple
            style="border-radius: 15px; padding: 10px"
            v-on:click="behavior.count += 1"
          >
            <div
              style="
                display: flex;
                flex-direction: row;
                justify-content: space-between;
              "
            >
              <div class="seed-icon">{{ behavior.emoji }}</div>
            </div>
            <div>
              <div style="text-align: left; font-size: 20px">
                {{ behavior.count }}
              </div>
              <div style="text-align: left">{{ behavior.behavior }}</div>
            </div>
          </div>
        </v-card>
      </div>
    </div>

    <div
      class="category-section"
      v-for="category in behaviorCategories"
      :key="category+'1'"
    >
      <div class="aspiration-divider">
        <b>{{ category }}</b>
      </div>
      <div class="seed-row-container">
        <v-card
          class="seed-row"
          :style="{ background: behavior.count == 0 ? 'inherit' : 'white' }"
          v-for="behavior in behaviors"
          :key="behavior.id"
          v-show="
            behavior.categories.includes(category) &&
            getSelected.includes(behavior.id)
          "
        >
          <v-btn
            icon
            color="gray"
            style="position: absolute; top: 0; right: 0; z-index: 2"
          >
            <v-icon>mdi-dots-horizontal-circle-outline</v-icon></v-btn
          >
          <div
            v-ripple
            style="border-radius: 15px; padding: 10px"
            v-on:click="behavior.count += 1"
          >
            <div style="display: flex; flex-direction: row; align-items: center;">
              <v-avatar color="green" size="50">
                <span class="white--text text-h5">{{ behavior.count }}</span>
              </v-avatar>
              <div style="text-align: left; font-size: 20px; margin-left: 20px">
                {{ behavior.behavior }}
              </div>
            </div>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  computed: {
    behaviorCategories() {
      return this.$store.getters.getCategories;
    },
    behaviors() {
      return this.$store.getters.getBehaviors;
    },
    getSelected() {
      return this.$store.getters.getSelected;
    },
  },
  data: () => {
    return {};
  },
  methods: {
    removeAspiration(index) {
      console.log("remove " + index);
      if (index < this.aspirations.length) {
        this.aspirations.splice(index, 1);
      }
    },
    addAspiration() {
      if (this.aspiration && this.aspirations.length < 3) {
        this.aspirations.push(this.aspiration);
        this.aspiration = null;
      } else {
        console.log("must not be empty");
      }
    },
  },
};
</script>

<style scoped>
.aspiration-divider {
  /* width: 90%; */
  background-color: #d1e6c9 !important;
  margin: 10px 5% 10px 5%;
  font-size: 20px;
  border-radius: 5px;
}
.home {
}
h2 {
}
.seed-icon {
  font-size: 36px;
}
#container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
}
.seed-tile {
  margin: 5px;
  max-width: 100px;
  min-width: 100px;
  border-radius: 15px !important;
}
.seed-row {
  margin: 5% 10px 5% 10px;
  width: 90%;
  border-radius: 15px !important;
}
.seed-row-container {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
}
</style>
