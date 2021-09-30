<template>
  <div class="Seeds">
    <div
      class="category-section"
      v-for="category in categories"
      :key="category"
    >
      <div class="aspiration-divider">{{ category }}</div>
      <v-card
        class="seed"
        v-for="behavior in behaviors"
        :key="behavior.id"
        v-show="behavior.categories.includes(category)"
      >
        <v-btn
          icon
          color="gray"
          style="
            position: absolute;
            top: 50%;
            right: 15px;
            z-index: 2;
            transform: translateY(-50%);
          "
        >
          <v-icon>mdi-information-outline</v-icon></v-btn
        >
        <div
          v-ripple
          v-on:click="toggleBehavior(behavior.id)"
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-content: center;
          "
        >
          <div style="display: flex; flex-direction: row">
            <v-checkbox
              style="font-size: 20px"
              v-model="selected"
              :value="behavior.id"
              v-on:click="toggleBehavior(behavior.id)"
            >
              <template v-slot:label>
                <div>
                  <div style="font-size: 20px; margin-left: 15px">
                    {{ behavior.behavior }}
                  </div>
                </div>
              </template>
            </v-checkbox>
          </div>
          <div class="seed-icon">{{ behavior.emoji }}</div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Seeds",
  components: {},
  data: () => {
    return {
      selected: [],
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
    toggleBehavior(id) {
      var index = this.selected.indexOf(id);
      if (index !== -1) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(id);
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
.seed {
  margin: 10px 5% 10px 5%;
  padding: 0px 20px 0px 20px;
}
.seed-icon {
  font-size: 36px;
  position: relative;
  height: 36px !important;
  top: 10px !important;
  margin-right: 40px;
}
</style>
