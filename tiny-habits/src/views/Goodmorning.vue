<template>
  <div class="goodmorning-container">
    <div style="height: 10vh">
      <div>Goodmorning</div>
      <!-- <div>Yesterday did you...</div>
    <div>Swipe left or right</div> -->
      <div>This morning did you...</div>
    </div>
    <div style="height: 50vh">
      <div :key="curr_idx" class="question-card">
        <div style="min-height: 182px;">
          <v-card-title>{{ questions[curr_idx].question }}</v-card-title>
          <div
            v-show="questions[curr_idx].extra_questions.length"
            style="padding: 16px"
          >
            <div style="text-align: left">
              {{ getExtraQuestion() }}
            </div>
            <v-slider
              style="padding-top: 8px"
              v-model="slider_value"
              step="10"
              thumb-label
              ticks
            ></v-slider>
          </div>
        </div>

        <div
          style="
            position: relative;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 0px 32px 0px 32px;
          "
        >
          <v-btn @click="answer(false)">no</v-btn>
          <v-btn @click="answer(true)">yes</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Goodmorning",
  data: () => ({
    slider_value: null,
    curr_idx: 0,
    extra_idx: 0,
    questions: [
      {
        id: 1,
        question: "Have any alcoholic drinks?",
        extra_questions: [
          {
            question: "If yes, how many drinks?",
            type: "int",
          },
          {
            question: "When was your last drink?",
            type: "time",
          },
        ],
      },
      {
        id: 2,
        question: "Make your bed?",
        extra_questions: [],
      },
      {
        id: 3,
        question: "Drink a cup of water?",
        extra_questions: [],
      },
      {
        id: 4,
        question: "Meditate for 1 minute?",
        extra_questions: [],
      },
      {
        id: 5,
        question: "Brush your teeth?",
        extra_questions: [],
      },
      {
        id: 6,
        question: "Go to the gym?",
        extra_questions: [],
      },
      {
        id: 6,
        question: "Go to the gym?",
        extra_questions: [],
      },
      {
        id: 7,
        question: "Shower?",
        extra_questions: [],
      },
      {
        id: 8,
        question: "Eat breakfast?",
        extra_questions: [],
      },
      {
        id: 9,
        question: "Take a fish oil supplement?",
        extra_questions: [],
      },
      {
        id: 10,
        question: "Take an L-Theanine supplement?",
        extra_questions: [],
      },
    ],
  }),
  computed: {},
  methods: {
    answer(answer) {
      console.log(this.curr_idx, answer);
      this.curr_idx = (this.curr_idx + 1) % this.questions.length;
      this.extra_idx = 0;
    },
    getExtraQuestion() {
      if (this.questions[this.curr_idx].extra_questions.length) {
        return this.questions[this.curr_idx].extra_questions[this.extra_idx]
          .question;
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
.question-card {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 340px;
  max-height: 400px;
  min-height: 250px;
  box-shadow: 0px 3px 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
}
</style>