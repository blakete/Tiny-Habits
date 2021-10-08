<template>
  <div class="goodmorning-container">
    <div v-show="!complete" style="position: relative; top: 30%; transform: translateY(-30%)">
      <div style="padding-bottom: 40px">
        <div style="font-size: 25px">Goodmorning</div>
        <!-- <div>Yesterday did you...</div>
    <div>Swipe left or right</div> -->
        <div style="font-size: 20px">This morning did you...</div>
      </div>
      <div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            margin: 0px 5% 10px 5%;
          "
        >
          <v-btn icon elevation="2" :disabled="curr_idx < 1" @click="undo()"
            ><v-icon>mdi-undo</v-icon></v-btn
          >
          <!-- <v-btn icon elevation="2"><v-icon>mdi-clipboard-text</v-icon></v-btn> -->
        </div>
        <div :key="curr_idx" class="question-card">
          <div>
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
              display: flex;
              justify-content: space-between;
              width: 100%;
              padding: 16px 32px 32px 32px;
            "
          >
            <v-btn @click="answer(false)">no</v-btn>
            <v-btn @click="answer(true)">yes</v-btn>
          </div>
        </div>
      </div>
    </div>
    <div v-show="complete" style="position: relative; top: 40%; transform: translateY(-40%);">
      <div style="font-size: 25px">Great work!</div>
        <div style="font-size: 20px">You are ready for the day.</div>
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
    answers: [],
    questions: [
      // {
      //   id: 1,
      //   question: "Have any alcoholic drinks?",
      //   extra_questions: [
      //     // {
      //     //   question: "If yes, how many drinks?",
      //     //   type: "int",
      //     // },
      //     // {
      //     //   question: "When was your last drink?",
      //     //   type: "time",
      //     // },
      //   ],
      // },
      {
        question: "Make your bed?",
        extra_questions: [],
      },
      {
        question: "Drink a cup of water?",
        extra_questions: [],
      },
      {
        question: "Meditate for 1 minute?",
        extra_questions: [],
      },
      {
        question: "Brush your teeth?",
        extra_questions: [],
      },
      {
        question: "Go to the gym?",
        extra_questions: [],
      },
      {
        question: "Go to the gym?",
        extra_questions: [],
      },
      {
        question: "Shower?",
        extra_questions: [],
      },
      {
        question: "Eat breakfast?",
        extra_questions: [],
      },
      {
        question: "Take a fish oil supplement?",
        extra_questions: [],
      },
      {
        question: "Take an L-Theanine supplement?",
        extra_questions: [],
      },
    ],
    complete: false,
  }),
  computed: {},
  methods: {
    answer(answer) {
      console.log(this.curr_idx, answer);
      if (this.curr_idx + 1 > this.answers.length) {
        this.answers.push(answer);
      } else {
        this.answers[this.curr_idx] = answer;
      }
      if (this.curr_idx + 1 >= this.questions.length) {
        this.complete = true;
      } else {
        this.curr_idx = (this.curr_idx + 1) % this.questions.length;
        this.extra_idx = 0;
      }
      console.log(this.answers);
    },
    getExtraQuestion() {
      if (this.questions[this.curr_idx].extra_questions.length) {
        return this.questions[this.curr_idx].extra_questions[this.extra_idx]
          .question;
      } else {
        return "";
      }
    },
    undo() {
      console.log(this.curr_idx);
      this.answers.pop();
      this.curr_idx -= 1;
      this.extra_idx = 0;
    },
  },
};
</script>

<style scoped>
.goodmorning-container {
  height: 100%;
}
.question-card {
  /* position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
  margin: 0 auto;
  width: 90%;
  max-width: 340px;
  max-height: 400px;
  /* min-height: 250px; */
  box-shadow: 0px 3px 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
}
</style>