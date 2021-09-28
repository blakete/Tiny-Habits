<template>
  <div class="home">
    <div id="container">
      <v-card
        class="seed-tile"
        v-for="behavior in behaviors"
        :key="behavior.id"
      >
        <v-btn icon color="gray" style="position: absolute; top: 0; right: 0; z-index: 2;">
          <v-icon>mdi-dots-horizontal-circle-outline</v-icon></v-btn
        >
        <div v-ripple style="border-radius: 15px; padding: 10px;">
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
            <div style="text-align: left; font-size: 20px">1</div>
            <div style="text-align: left">{{ behavior.behavior }}</div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data: () => {
    return {
      behaviors: [
        {
          id: 1,
          emoji: "🙏",
          anchor: "",
          behavior: "Gratitude",
          celebration: "",
        },
        {
          id: 2,
          emoji: "🙏",
          anchor: "",
          behavior: "Gratitude",
          celebration: "",
        },
        {
          id: 3,
          emoji: "🙏",
          anchor: "",
          behavior: "Gratitude",
          celebration: "",
        },
        {
          id: 4,
          emoji: "🙏",
          anchor: "",
          behavior: "Gratitude",
          celebration: "",
        },
        {
          id: 5,
          emoji: "🙏",
          anchor: "",
          behavior: "Gratitude",
          celebration: "",
        },
      ],
    };
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
  max-width: 125px;
  min-width: 100px;
  border-radius: 15px !important;
}
</style>
