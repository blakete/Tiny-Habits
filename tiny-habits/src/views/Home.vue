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
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {},
  computed: mapGetters(["getRefreshToken", "getUsername", "getAccessToken"]),
  data: () => {
    return {
      categories: [
        "Productivity 🧑‍💻",
        "Mental Wellness 🧠",
        "Physical Health ❤️",
        "Sleep 💤",
        "Nutrition 🍎",
      ],
      behaviors: [
        {
          id: 1,
          count: 0,
          emoji: "🙏",
          anchor: "",
          behavior: "Gratitude",
          celebration: "",
          categories: ["Mental Wellness 🧠"],
        },
        {
          id: 2,
          count: 0,
          emoji: "🛏",
          anchor: "",
          behavior: "Make bed",
          celebration: "",
          categories: ["Mental Wellness 🧠"],
        },
        {
          id: 3,
          count: 0,
          emoji: "📖",
          anchor: "",
          behavior: "Read",
          celebration: "",
          categories: ["Mental Wellness 🧠"],
        },
        {
          id: 4,
          count: 0,
          emoji: "🗒",
          anchor: "",
          behavior: "Todo list",
          celebration: "",
          categories: ["Productivity 🧑‍💻"],
        },
        {
          id: 5,
          count: 0,
          emoji: "📝",
          anchor: "",
          behavior: "Journal",
          celebration: "",
          categories: ["Mental Wellness 🧠"],
        },
        {
          id: 6,
          count: 0,
          emoji: "💪",
          anchor: "",
          behavior: "Exercise",
          celebration: "",
          categories: ["Physical Health ❤️"],
        },
        {
          id: 7,
          count: 0,
          emoji: "🧐",
          anchor: "",
          behavior: "80/20 rule",
          celebration: "",
          categories: ["Productivity 🧑‍💻"],
        },
        {
          id: 8,
          count: 0,
          emoji: "👟",
          anchor: "",
          behavior: "Lunch walk",
          celebration: "",
          categories: ["Physical Health ❤️", "Mental Wellness 🧠"],
        },
        {
          id: 9,
          count: 0,
          emoji: "💊",
          anchor: "",
          behavior: "Magnesium L-Threonate",
          celebration: "",
          categories: ["Sleep 💤"],
        },
        {
          id: 10,
          count: 0,
          emoji: "🌡",
          anchor: "",
          behavior: "Bedroom temperature",
          celebration: "",
          categories: ["Sleep 💤"],
        },
        {
          id: 11,
          count: 0,
          emoji: "💡",
          anchor: "",
          behavior: "Lights out time",
          celebration: "",
          categories: ["Sleep 💤"],
        },
        {
          id: 12,
          count: 0,
          emoji: "😎",
          anchor: "",
          behavior: "Sleep eye mask",
          celebration: "",
          categories: ["Sleep 💤"],
        },
        {
          id: 13,
          count: 0,
          emoji: "☀️",
          anchor: "",
          behavior: "Morning walk",
          celebration: "",
          categories: ["Sleep 💤", "Physical Health ❤️", "Mental Wellness 🧠"],
        },
        {
          id: 14,
          count: 0,
          emoji: "💦",
          anchor: "",
          behavior: "Gallon of water",
          celebration: "",
          categories: [
            "Sleep 💤",
            "Physical Health ❤️",
            "Mental Wellness 🧠",
            "Nutrition 🍎",
            "Productivity 🧑‍💻",
          ],
        },
        {
          id: 15,
          count: 0,
          emoji: "🙂",
          anchor: "",
          behavior: "Morning probiotic",
          celebration: "",
          categories: ["Nutrition 🍎"],
        },
        {
          id: 16,
          count: 0,
          emoji: "🍌",
          anchor: "",
          behavior: "Eat one portion of fruit",
          celebration: "",
          categories: ["Nutrition 🍎"],
        },
        {
          id: 17,
          count: 0,
          emoji: "📵",
          anchor: "",
          behavior: "No social media",
          celebration: "",
          categories: ["Mental Wellness 🧠"],
        },
        {
          id: 18,
          count: 0,
          emoji: "⏱",
          anchor: "",
          behavior: "30-5 intervals",
          celebration: "",
          categories: ["Mental Wellness 🧠", "Productivity 🧑‍💻"],
        },
        {
          id: 19,
          count: 0,
          emoji: "🚿",
          anchor: "",
          behavior: "Shower",
          celebration: "",
          categories: ["Mental Wellness 🧠", "Physical Health ❤️"],
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
  max-width: 100px;
  min-width: 100px;
  border-radius: 15px !important;
}
</style>
