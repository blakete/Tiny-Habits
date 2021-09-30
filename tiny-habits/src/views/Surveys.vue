<template>
  <div class="about">
    <div class="aspiration-divider">Goodmorning 🌱</div>
    <v-card
      class="question-card"
      v-for="question in questions"
      :key="question.id"
    >
      <v-card-title style="word-break: break-word;">{{ question.question }}</v-card-title>
      <div
        v-ripple
        style="display: flex; flex-direction: row; padding: 10px 16px 10px 16px"
        v-for="option in question.options"
        :key="option"
        v-on:click="question.answer = option"
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
      <v-btn v-on:click="clearForm()" medium elevation="0" style="background-color: rgba(255,255,255);">Clear form</v-btn>
      <v-btn large outlined>Submit</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Surveys",
  components: {},
  data: () => {
    return {
      questions: [
        {
          id: 1,
          question: "Read before bed?",
          type: "mc",
          options: ["Yes", "No"],
          answer: null,
        },
        {
          id: 2,
          question: "Magnesium L-Threonate before bed?",
          type: "mc",
          options: ["Yes", "No"],
          answer: null,
        },
        {
          id: 3,
          question: "Make bed this morning?",
          type: "mc",
          options: ["Yes", "No"],
          answer: null,
        },
        {
          id: 4,
          question: "Gratitude this morning?",
          type: "mc",
          options: ["Yes", "No"],
          answer: null,
        },
      ],
    };
  },
  methods: {
      clearForm() {
          for (var i =0; i < this.questions.length; i++) {
              this.questions[i].answer = null
          }
      }
  }
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
