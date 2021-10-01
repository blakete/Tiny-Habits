<template>
  <div class="about">
    <div
      v-show="getSelected.length < 1"
      style="margin: 10px 5% 0px 5%; font-size: 20px"
    >
      No survey available. <br />Select seeds first!
    </div>
    <div v-show="getSelected.length > 0">
      <div class="aspiration-divider">Goodmorning 🌱</div>
      <v-card
        class="question-card"
        v-for="question in getQuestions"
        :key="question.id"
        v-show="getSelected.includes(question.id)"
      >
        <v-card-title style="word-break: break-word">{{
          question.question
        }}</v-card-title>
        <div
          v-ripple
          style="
            display: flex;
            flex-direction: row;
            padding: 10px 16px 10px 16px;
          "
          v-for="option in question.options"
          :key="option"
          v-on:click="setQuestionAnswer(question.id, option)"
        >
          <v-btn
            outlined
            small
            icon
            :style="{
              background: question.answer != option ? 'inherit' : '#d1e6c9',
            }"
          >
          </v-btn>
          <div style="font-size: 20px; margin-left: 15px">{{ option }}</div>
        </div>
      </v-card>
      <div
        style="
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin: 20px 5% 10px 5%;
        "
      >
        <v-btn
          v-on:click="clearForm()"
          medium
          elevation="0"
          style="background-color: rgba(255, 255, 255)"
          >Clear form</v-btn
        >
        <v-btn large outlined>Submit</v-btn>
      </div>
    </div>
    <!-- <div>{{ getQuestions }}</div> -->
  </div>
</template>

<script>
export default {
  name: "Surveys",
  components: {},
  computed: {
    getQuestions() {
      return this.$store.getters.getQuestions;
    },
    getBehaviors() {
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
    clearForm() {
      var answer = null;
      for (var i = 0; i < this.getQuestions.length; i++) {
        if (this.getSelected.includes(this.getQuestions[i].id)) {
          var id = this.getQuestions[i].id;
          this.$store.commit("setQuestionAnswer", { id, answer });
        }
      }
    },
    setQuestionAnswer(id, answer) {
      this.$store.commit("setQuestionAnswer", { id, answer });
    },
  },
};
</script>


<style scoped>
.question-card {
  margin: 10px 5% 10px 5%;
  padding: 20px;
  border-radius: 15px;
}
.aspiration-divider {
  width: 90%;
  background-color: #d1e6c9 !important;
  margin: 10px 5% 10px 5%;
  font-size: 20px;
  border-radius: 5px;
}
</style>
