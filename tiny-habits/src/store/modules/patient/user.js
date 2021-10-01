import Vue from 'vue'
import Axios from 'axios'
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

var PRODUCTION_MODE = false
var BASE_URL = "http://localhost:8080"
// BASE_URL = "http://192.168.86.2:8080"
if (PRODUCTION_MODE) {
  BASE_URL = ""
}

const state = {
  status: '',
  refreshToken: localStorage.getItem('refreshToken') || '',
  expirationTime: localStorage.getItem('expirationTime') || 0,
  accessToken: localStorage.getItem('accessToken') || '',
  user: {
    email: "blakeedwards823@gmail.com",
    phone: "8603337654",
    name: "Blake",
  },
  categories: [
    "Productivity 🧑‍💻",
    "Mental Wellness 🧠",
    "Physical Health ❤️",
    "Sleep 💤",
    "Nutrition 🍎",
  ],
  selected: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  behaviors: [
    {
      id: 1,
      type: "complete",
      count: 0,
      emoji: "🙏",
      anchor: "",
      behavior: "Gratitude",
      celebration: "",
      categories: ["Mental Wellness 🧠"],
    },
    {
      id: 2,
      type: "complete",
      count: 0,
      emoji: "🛏",
      anchor: "",
      behavior: "Make bed",
      celebration: "",
      categories: ["Mental Wellness 🧠"],
    },
    {
      id: 3,
      type: "complete",
      count: 0,
      emoji: "📖",
      anchor: "",
      behavior: "Read",
      celebration: "",
      categories: ["Mental Wellness 🧠"],

    },
    {
      id: 4,
      type: "complete",
      count: 0,
      emoji: "🗒",
      anchor: "",
      behavior: "Todo list",
      celebration: "",
      categories: ["Productivity 🧑‍💻"],
    },
    {
      id: 5,
      type: "complete",
      count: 0,
      emoji: "📝",
      anchor: "",
      behavior: "Journal",
      celebration: "",
      categories: ["Mental Wellness 🧠"],
    },
    {
      id: 6,
      type: "complete",
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
      type: "threshold-greater",
      emoji: "🧐",
      anchor: "",
      behavior: "80/20 rule",
      celebration: "",
      categories: ["Productivity 🧑‍💻"],
    },
    {
      id: 8,
      type: "complete",
      count: 0,
      emoji: "👟",
      anchor: "",
      behavior: "Lunch walk",
      celebration: "",
      categories: ["Physical Health ❤️", "Mental Wellness 🧠"],
    },
    {
      id: 9,
      type: "complete",
      count: 0,
      emoji: "💊",
      anchor: "",
      behavior: "Magnesium L-Threonate",
      celebration: "",
      categories: ["Sleep 💤"],
    },
    {
      id: 10,
      type: "complete",
      count: 0,
      emoji: "🌡",
      anchor: "",
      behavior: "Bedroom temperature",
      celebration: "",
      categories: ["Sleep 💤"],
    },
    {
      id: 11,
      type: "complete",
      count: 0,
      emoji: "💡",
      anchor: "",
      behavior: "Lights out time",
      celebration: "",
      categories: ["Sleep 💤"],
    },
    {
      id: 12,
      type: "complete",
      count: 0,
      emoji: "😎",
      anchor: "",
      behavior: "Sleep eye mask",
      celebration: "",
      categories: ["Sleep 💤"],
    },
    {
      id: 13,
      type: "complete",
      count: 0,
      emoji: "☀️",
      anchor: "",
      behavior: "Morning walk",
      celebration: "",
      categories: ["Sleep 💤", "Physical Health ❤️", "Mental Wellness 🧠"],
    },
    {
      id: 14,
      type: "threshold-greater",
      value: 128,
      units: "oz",
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
      type: "complete",
      count: 0,
      emoji: "🙂",
      anchor: "",
      behavior: "Morning probiotic",
      celebration: "",
      categories: ["Nutrition 🍎"],
    },
    {
      id: 16,
      type: "complete",
      count: 0,
      emoji: "🍌",
      anchor: "",
      behavior: "Eat one portion of fruit",
      celebration: "",
      categories: ["Nutrition 🍎"],
    },
    {
      id: 17,
      type: "complete",
      count: 0,
      emoji: "📵",
      anchor: "",
      behavior: "No social media",
      celebration: "",
      categories: ["Mental Wellness 🧠"],
    },
    {
      id: 18,
      type: "complete",
      count: 0,
      emoji: "⏱",
      anchor: "",
      behavior: "30-5 intervals",
      celebration: "",
      categories: ["Mental Wellness 🧠", "Productivity 🧑‍💻"],
    },
    {
      id: 19,
      type: "complete",
      count: 0,
      emoji: "🚿",
      anchor: "",
      behavior: "Shower",
      celebration: "",
      categories: ["Mental Wellness 🧠", "Physical Health ❤️"],
    },
    {
      id: 20,
      type: "threshold-less",
      count: 0,
      emoji: "🍻",
      anchor: "",
      behavior: "Alcohol",
      celebration: "",
      categories: ["Sleep 💤", "Nutrition 🍎", "Mental Wellness 🧠", "Physical Health ❤️", "Productivity 🧑‍💻"],
    },
  ],
  questions: [
    {
      id: 1,
      question: "Gratitude this morning?",
      type: "mc",
      options: ["Yes", "No"],
      default: "No",
      answer: null,
    },
    {
      id: 2,
      question: "Make bed this morning?",
      type: "mc",
      options: ["Yes", "No"],
      default: "No",
      answer: null,
    },
    {
      id: 3,
      question: "Read yesterday?",
      type: "mc",
      options: ["Yes", "No"],
      default: "No",
      answer: null,
    },
    {
      id: 4,
      question: "Create todo list this morning?",
      type: "mc",
      options: ["Yes", "No"],
      default: "No",
      answer: null,
    },
    {
      id: 5,
      question: "Journal this morning?",
      type: "mc",
      options: ["Yes", "No"],
      default: "No",
      answer: null,
    },
    {
      id: 6,
      question: "Exercise yesterday?",
      type: "mc",
      options: ["Yes", "No"],
      default: "No",
      answer: null,
    },
    {
      id: 10,
      question: "Set a cool bedroom temperature for sleep?",
      type: "mc",
      options: ["Yes", "No"],
      default: "No",
      answer: null,
    },
    {
      id: 12,
      question: "Wear an eye mask to sleep?",
      type: "mc",
      options: ["Yes", "No"],
      default: "No",
      answer: null,
    },
    {
      id: 15,
      question: "Take a probiotic this morning?",
      type: "mc",
      options: ["Yes", "No"],
      default: "No",
      answer: null,
    },
    {
      id: 16,
      question: "Eat a portion of fruit yesterday?",
      type: "mc",
      options: ["Yes", "No"],
      default: "No",
      answer: null,
    },
    {
      id: 17,
      question: "Use social media yesterday?",
      type: "mc",
      options: ["Yes", "No"],
      default: "No",
      answer: null,
    },
    {
      id: 19,
      question: "Shower this morning?",
      type: "mc",
      options: ["Yes", "No"],
      default: "No",
      answer: null,
    },
  ],
}

const getters = {
  getAccessToken: state => state.accessToken,
  getRefreshToken: state => state.refreshToken,
  isLoggedIn: state => {
    // var now = new Date();
    // var utc_now = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
    return (!!state.refreshToken)
  },
  authStatus: state => state.status,
  getUser: state => state.user,
  getEmail: state => state.user.email,
  getName: state => state.user.name,
  getCategories: state => state.categories,
  getBehaviors: state => state.behaviors,
  getSelected: state => state.selected,
  getQuestions: state => state.questions,
}

// https://vuex.vuejs.org/guide/actions.html#actions 
const actions = {

  login({ commit }, user) {
    console.log("login:")
    console.log(user)
    return new Promise((resolve, reject) => {
      commit('auth_request')
      Axios({ url: BASE_URL + '/login', data: user, method: 'POST' })
        .then(resp => {
          const message = resp.data.message;
          const status = resp.data.status;
          if (status === "false") {
            console.log("LOGIN FAILED")
            resolve({
              success: 0,
              message: message
            })
          } else {
            console.log("LOGIN SUCCESS")
            console.log(resp)
            const refreshToken = resp.data.refreshToken
            const expirationTime = resp.data.expirationTime;
            // TODO: get and save user role, institutions, and groups
            const role = resp.data.user.role;
            const institutions = resp.data.user.institutions;
            const groups = resp.data.user.groups;
            const username = resp.data.user.email
            const firstName = resp.data.user.firstName
            const lastName = resp.data.user.lastName
            const hasCompletedProfile = resp.data.user.hasCompletedProfile
            const hasCompletedTwoFactor = resp.data.user.hasCompletedTwoFactor
            const hasSetPassword = resp.data.user.hasSetPassword
            localStorage.setItem('refreshToken', refreshToken)
            localStorage.setItem('expirationTime', expirationTime)
            console.log("auth success obj:")
            console.log({ refreshToken, expirationTime, username, firstName, lastName, hasCompletedTwoFactor, hasCompletedProfile, hasSetPassword })
            commit('auth_success', { refreshToken, expirationTime, role, institutions, groups, username, firstName, lastName, hasCompletedTwoFactor, hasCompletedProfile, hasSetPassword })
            resolve({
              success: 1,
              message: message,
              hasSetPassword: hasSetPassword,
              hasCompletedTwoFactor: hasCompletedTwoFactor,
              hasCompletedProfile: hasCompletedProfile,
              role: role,
            })
          }
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('refreshToken')
          reject(err)
        })
    })
  },

  refreshAccess({ commit, state }) {
    const email = state.user.username
    const refreshToken = state.refreshToken
    // const refreshToken = "expired refresh token"
    const payload = { refreshToken, email }
    console.log("refresh payload:")
    console.log(payload)
    return new Promise((resolve, reject) => {
      commit('access_request')
      Axios({ url: BASE_URL + '/refresh', data: payload, method: 'POST' })
        .then(resp => {
          console.log("refresh:")
          console.log(resp)
          const message = resp.data.message;
          const status = resp.data.status;
          if (status !== "false") {
            console.log("REFRESH ACCESS SUCCESS")
            const accessToken = resp.data.accessToken
            localStorage.setItem('accessToken', accessToken)
            commit('access_success', { accessToken })
            resolve({
              success: 1,
              message: message,
            })
          } else {
            console.log("REFRESH ACCESS FAILURE")
            resolve({
              success: 0,
              message: message,
            })
          }
        })
        .catch(err => {
          commit('access_error')
          localStorage.removeItem('accessToken')
          reject(err)
        })
    })
  },

  logout({ commit }) {
    const email = state.user.username
    const refreshToken = state.refreshToken
    const logoutObj = { refreshToken, email }
    console.log("Canceling refresh token rights for user:")
    console.log(logoutObj)
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('accessToken')
    return new Promise((resolve, reject) => {
      commit('logoutUser')
      Axios({ url: BASE_URL + '/logout', data: logoutObj, method: 'POST' })
        .then(resp => {
          const message = resp.data.message;
          const status = resp.data.status;
          console.log("Logout status: " + status)
          console.log("Logout message: " + message)
          if (status === "false") {
            resolve({
              success: 0,
              message: message,
            })
          } else {
            resolve({
              success: 1,
              message: message,
            })
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },


}

// https://vuex.vuejs.org/guide/mutations.html#mutations-must-be-synchronous
// mutations are synchronous functions that modify client state
const mutations = {
  toggleBehavior(state, id) {
    var index = state.selected.indexOf(id);
    if (index !== -1) {
      state.selected.splice(index, 1);
    } else {
      state.selected.push(id);
    }
  },
  setQuestionAnswer(state, { id, answer }) {
    for (var i = 0; i < state.questions.length; i++) {
      if (state.questions[i].id === id) {
        state.questions[i].answer = answer
      }
    }
  },
  changeEmail(state) {
    state.user.email = "31laxbdog";
  },
  auth_request(state) {
    state.status = 'loading'
  },
  auth_success(state) {
    state.status = 'success'

  },
  auth_error(state) {
    state.status = 'error'
  },
  access_request(state) {
    state.status = 'loading'
  },
  access_success(state, { accessToken }) {
    state.status = 'success'
    state.accessToken = accessToken
  },
  access_error(state) {
    state.status = 'error'
  },
  logoutUser(state) {
    console.log("Logging out user")
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('accessToken')
    state.user = {}
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}

