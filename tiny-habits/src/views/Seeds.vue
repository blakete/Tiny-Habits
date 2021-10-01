<template>
  <div class="Seeds">
    <div
      class="category-section"
      v-for="category in behaviorCategories"
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
              :value="behavior.id"
              v-model="getSelected"
              :readonly="true"
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
    toggleBehavior(id) {
      this.$store.commit("toggleBehavior", id);
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
