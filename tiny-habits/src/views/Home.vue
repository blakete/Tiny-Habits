<template>
  <div class="home">
    <div
      class="category-section"
      v-for="category in categories"
      :key="category"
    >
      <div class="aspiration-divider">{{ category }}</div>
      <div id="container">
        <v-card
          class="seed-tile"
          :style="{ background: behavior.count == 0 ? 'inherit' : '#d1e6c9' }"
          v-for="behavior in behaviors"
          :key="behavior.id"
          v-show="behavior.categories.includes(category)"
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
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data: () => {
    return {
      categories: [
        "Productivity",
        "Mental Wellness",
        "Physical Health",
        "Sleep",
        "Nutrition",
      ],
      behaviors: [
        {
          id: 1,
          count: 0,
          emoji: "🙏",
          anchor: "",
          behavior: "Gratitude",
          celebration: "",
          categories: ["Mental Wellness"],
        },
        {
          id: 2,
          count: 0,
          emoji: "🛏",
          anchor: "",
          behavior: "Make bed",
          celebration: "",
          categories: ["Mental Wellness"],
        },
        {
          id: 3,
          count: 0,
          emoji: "📖",
          anchor: "",
          behavior: "Read",
          celebration: "",
          categories: ["Mental Wellness"],
        },
        {
          id: 4,
          count: 0,
          emoji: "🗒",
          anchor: "",
          behavior: "Todo list",
          celebration: "",
          categories: ["Productivity"],
        },
        {
          id: 5,
          count: 0,
          emoji: "📝",
          anchor: "",
          behavior: "Journal",
          celebration: "",
          categories: ["Mentality"],
        },
        {
          id: 6,
          count: 0,
          emoji: "💪",
          anchor: "",
          behavior: "Exercise",
          celebration: "",
          categories: ["Physical Health"],
        },
        {
          id: 7,
          count: 0,
          emoji: "🧐",
          anchor: "",
          behavior: "Pareto rule",
          celebration: "",
          categories: ["Productivity"],
        },
        {
          id: 8,
          count: 0,
          emoji: "👟",
          anchor: "",
          behavior: "Lunch walk",
          celebration: "",
          categories: ["Physical Health", "Mental Wellness"],
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
.aspiration-divider {
  width: 90%;
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
  max-width: 125px;
  min-width: 100px;
  border-radius: 15px !important;
}
</style>
