<template>
  <div class="home">
    <div v-show="step === 1">
      <h2><b>Enter an aspiration or outcome, then press enter</b></h2>
      <v-text-field
        v-on:keyup.enter="addAspiration()"
        v-model="aspiration"
        placeholder="build and maintain a social network"
        outlined
      ></v-text-field>
      <div v-for="(an_aspiration, index) in aspirations" :key="index">
        <div style="display: flex; flex-direction: horizontal">
          <v-btn icon v-on:click="removeAspiration(index)"
            ><v-icon dark> mdi-close </v-icon></v-btn
          >
          <h3>{{ an_aspiration }}</h3>
        </div>
      </div>
      <v-btn v-show="aspirations.length > 0" v-on:click="step = 2">done</v-btn>
    </div>
    <div v-show="step === 2">
      <h2><b>Which is currently most important to you?</b></h2>
      <ul style="padding-left: 20px">
        <li v-for="(an_aspiration, index) in aspirations" :key="index">
          <div
            v-on:click="
              focusAspiration = index;
              step = 3;
            "
          >
            <h3>{{ an_aspiration }}</h3>
          </div>
        </li>
      </ul>
    </div>
    <div v-show="step === 3">
      <h2>
        <b>{{ aspirations[focusAspiration] }}</b>
      </h2>
      <br />
      <h2>
        <b>What behaviors would help you move towards this goal?</b>
      </h2>
      <v-text-field
        v-on:keyup.enter="addAspiration()"
        v-model="aspiration"
        placeholder="send one text to a friend each day"
        outlined
      ></v-text-field>
      <div v-for="(a_behavior, index) in behaviors" :key="index">
        <div style="display: flex; flex-direction: horizontal">
          <h3>{{ a_behavior }}</h3>
        </div>
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
      step: 1,
      aspiration: null,
      aspirations: [],
      focusAspiration: null,
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
  padding: 20px;
  text-align: left;
}
h2 {
  text-align: left;
}
</style>
