// import Axios from 'Axios'
import Vue from 'vue'
import Axios from 'axios'
import VueCookies from 'vue-cookies';
// import Cookie from 'js-cookie'
// import router from '@/router/index.js'
Vue.use(VueCookies);

var PRODUCTION_MODE = true
var BASE_URL = "http://localhost:8080"
var ARTICLE_URL = BASE_URL
BASE_URL = "http://192.168.86.2:8080"
if (PRODUCTION_MODE) {
  BASE_URL = ""
  ARTICLE_URL = "https://images.holistichealth.ai/articles"
}

const state = {
  status: '',
  refreshToken: localStorage.getItem('refreshToken') || '',
  expirationTime: localStorage.getItem('expirationTime') || 0,
  accessToken: localStorage.getItem('accessToken') || '',
  user: {
    tiles: [
      {
        id: "1",
        type: "goal",
        elementColor: "rgb(255, 173, 31)",
        title: "Calories Burned (Apple Health)",
        date: "05/21/21",
        data: {
          value: 70,
          goal: 12000,
        },
      },
      {
        id: "2",
        type: "value",
        elementColor: "rgb(0, 0, 0)",
        title: "Steps (Apple Health)",
        date: "05/21/21",
        data: {
          value: 70,
          goal: 12000,
        },
      },
      {
        id: "3",
        type: "goal",
        elementColor: "rgb(245, 0, 7)",
        title: "Resting Heart Rate (Apple Health)",
        date: "05/21/21",
        data: {
          value: 60,
          goal: 12000,
        },
      },

      {
        id: "5",
        type: "goal",
        elementColor: "rgb(227, 0, 252)",
        title: "VO2 Max (Apple Health)",
        date: "05/21/21",
        data: {
          value: 55,
          goal: 12000,
        },
      },
      {
        id: "4",
        type: "chart",
        elementColor: "rgb(245, 0, 7)",
        title: "Heart Rate (Apple Health)",
        date: "05/21/21",
        data: {
          x: [],
          y: [],
        },
      },
      {
        id: "6",
        type: "goal",
        elementColor: "rgb(52, 154, 242)",
        title: "Carbohydrates (Daily) (Apple Health)",
        date: "05/21/21",
        data: {
          value: 33,
          goal: 12000,
        },
      },
      {
        id: "7",
        type: "goal",
        elementColor: "rgb(254, 211, 67)",
        title: "Fat (Daily) (Apple Health)",
        date: "05/21/21",
        data: {
          value: 35,
          goal: 12000,
        },
      },
      // {
      //   id: "8",
      //   type: "goal",
      //   elementColor: "rgb(20, 139, 22)",
      //   title: "Protein (Daily) (Apple Health)",
      //   date: "05/21/21",
      //   data: {
      //     value: 38,
      //     goal: 12000,
      //   },
      // },
    ],

  },
  lat: null,
  lon: null,
  publicIP: null,
  city: null,
  region: null,


}

const getters = {
  isLoggedIn: state => {
    // var now = new Date();
    // var utc_now = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
    return (!!state.refreshToken)
  },
  authStatus: state => state.status,
  getUser: state => state.user,
  getUsername: state => state.user.username,
  getFirstName: state => state.user.firstName,
  getLastName: state => state.user.lastName,
  getInitials: state => (state.user.firstName === null && state.user.lastName === null) ? "NA" : state.user.firstName.charAt(0) + state.user.lastName.charAt(0),
  getAccessToken: state => state.accessToken,
  getRefreshToken: state => state.refreshToken,
  getUserTiles: state => state.user.tiles,
  hasSetPassword: state => state.user.hasSetPassword,
  hasCompletedTwoFactor: state => state.user.hasCompletedTwoFactor,
  getUserRole: state => state.user.role,
  getUserLogs: state => state.user.currentDayLogs,
  getUserTrackers: state => state.user.trackers,
  getUserTrackerByTag: state => trackerTag => state.user.trackers.find(tracker => tracker.tag === trackerTag) 
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

  requestInvite(context, requestForm) {
    console.log("Request form: ")
    console.log(requestForm)
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/invite', data: requestForm, method: 'POST' })
        .then(resp => {
          const message = resp.data.message;
          const status = resp.data.status;
          console.log(status, message)
          if (status !== "false") {
            resolve({
              success: 1,
              message: message,
            })
          } else {
            resolve({
              success: 0,
              message: message,
            })
          }

        })
        .catch(err => {
          reject(err)
        })
    })
  },

  submitHelpMessage({ state }, { route, helpMessage }) {
    const email = state.user.username
    const accessToken = localStorage.getItem("accessToken")
    const payload = {
      accessToken: accessToken,
      email: email,
      route: route,
      message: helpMessage
    }
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/helpmessage', data: payload, method: 'POST' })
        .then((response) => {
          const message = response.data.message;
          const status = response.data.status;
          if (status !== "false") {
            resolve({
              success: 1,
              message: message
            })
          } else {
            resolve({
              success: 0,
              message: message
            })
          }
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })

  },

  logSymptom({ state }, { status, what, why, save, lat, lon }) {
    const email = state.user.username
    const accessToken = localStorage.getItem("accessToken")
    const payload = {
      accessToken: accessToken,
      email: email,
      status: status,
      what: what,
      why: why,
      save: save,
      lat: lat,
      lon: lon
    }
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/logsymptom', data: payload, method: 'POST' })
        .then((response) => {
          const message = response.data.message;
          const status = response.data.status;
          if (status !== "false") {
            resolve({
              success: 1,
              message: message
            })
          } else {
            resolve({
              success: 0,
              message: message
            })
          }
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  },

  logDelete({ state }, { dailyLogID }) {
    const email = state.user.username
    const accessToken = localStorage.getItem("accessToken")
    const payload = {
      accessToken: accessToken,
      email: email,
      dailyLogID: dailyLogID
    }
    console.log("Attempting to delete log:")
    console.log(payload)
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/deletelog', data: payload, method: 'POST' })
        .then((response) => {
          console.log(response)
          const message = response.data.message;
          const status = response.data.status;
          if (status !== "false") {
            resolve({
              success: 1,
              message: message
            })
          } else {
            resolve({
              success: 0,
              message: message
            })
          }
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  },

  logNote({ state }, { note }) {
    const email = state.user.username
    const accessToken = localStorage.getItem("accessToken")
    const payload = {
      accessToken: accessToken,
      username: email,
      note: note,
    }
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/lognote', data: payload, method: 'POST' })
        .then((response) => {
          const message = response.data.message;
          const status = response.data.status;
          if (status !== "false") {
            resolve({
              success: 1,
              message: message
            })
          } else {
            resolve({
              success: 0,
              message: message
            })
          }
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  },

  getDailyMes({ state }) {
    const email = state.user.username
    const accessToken = localStorage.getItem("accessToken")
    const payload = {
      accessToken: accessToken,
      email: email
    }
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/getdailymes', data: payload, method: 'POST' })
        .then((response) => {
          const status = response.data.status;
          if (status !== "false") {
            const logs = response.data.logs;
            resolve({
              success: 1,
              logs: logs
            })
          } else {
            resolve({
              success: 0,
              logs: null
            })
          }
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  },

  register(context, user) {
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/register', data: user, method: 'POST' })
        .then(resp => {
          const message = resp.data.message;
          const status = resp.data.status;
          if (status !== "false") {
            resolve({
              success: 1,
              message: message
            })
          } else {
            resolve({
              success: 0,
              message: message
            })
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  request(context, userRequest) {
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/request', data: userRequest, method: 'POST' })
        .then(resp => {
          const message = resp.data.message;
          const status = resp.data.status;
          if (status !== "false") {
            resolve({
              success: 1,
              message: message
            })
          } else {
            resolve({
              success: 0,
              message: message
            })
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  resetPassword({ state, commit }, { password }) {
    const email = state.user.username
    const accessToken = localStorage.getItem("accessToken")
    const data = {
      email: email,
      accessToken: accessToken,
      password: password
    }
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/reset-password', data: data, method: 'POST' })
        .then(resp => {
          const message = resp.data.message;
          const status = resp.data.status;
          if (status !== "false") {
            const hasSetPassword = true
            commit('setHasSetPassword', { hasSetPassword })
            resolve({
              success: 1,
              message: message
            })
          } else {
            resolve({
              success: 0,
              message: message
            })
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  completeTwoFactor({ state }, { mobilePhone }) {
    const email = state.user.username
    const accessToken = localStorage.getItem("accessToken")
    const data = {
      email: email,
      accessToken: accessToken,
      mobilePhone: mobilePhone
    }
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/complete-twofactor', data: data, method: 'POST' })
        .then(resp => {
          const message = resp.data.message;
          const status = resp.data.status;
          if (status !== "false") {
            resolve({
              success: 1,
              message: message
            })
          } else {
            resolve({
              success: 0,
              message: message
            })
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  verifyTwoFactor({ state, commit }, { twoFactorCode }) {
    const email = state.user.username
    const accessToken = localStorage.getItem("accessToken")
    const data = {
      email: email,
      accessToken: accessToken,
      twoFactorCode: twoFactorCode
    }
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/verify-twofactor', data: data, method: 'POST' })
        .then(resp => {
          const message = resp.data.message;
          const status = resp.data.status;
          if (status !== "false") {
            const hasCompletedTwoFactor = true
            commit('setHasCompletedTwoFactor', { hasCompletedTwoFactor })
            resolve({
              success: 1,
              message: message
            })
          } else {
            const hasCompletedTwoFactor = false
            commit('setHasCompletedTwoFactor', { hasCompletedTwoFactor })
            resolve({
              success: 0,
              message: message
            })
          }
        })
        .catch(err => {
          const hasCompletedTwoFactor = false
          commit('setHasCompletedTwoFactor', { hasCompletedTwoFactor })
          reject(err)
        })
    })
  },

  resendTwoFactor({ state }) {
    const email = state.user.username
    const accessToken = localStorage.getItem("accessToken")
    const data = {
      email: email,
      accessToken: accessToken,
    }
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/resend-twofactor', data: data, method: 'POST' })
        .then(resp => {
          const message = resp.data.message;
          const status = resp.data.status;
          if (status !== "false") {
            resolve({
              success: 1,
              message: message
            })
          } else {
            resolve({
              success: 0,
              message: message
            })
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getUserServices({ state }) {
    const email = state.user.username
    const accessToken = localStorage.getItem("accessToken")
    const data = {
      email: email,
      accessToken: accessToken,
    }
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/connect/services', data: data, method: 'POST' })
        .then(resp => {
          const message = resp.data.message;
          const status = resp.data.status;
          if (status !== "false") {
            const services = resp.data.services;
            resolve({
              success: 1,
              message: message,
              services: services
            })
          } else {
            resolve({
              success: 0,
              message: message
            })
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  completeProfile({ state, commit }, { birthDate, sex, bodyWeight, heightInch, waistCircumference, hipCircumference, interests, ethnicity }) {
    const email = state.user.username
    const accessToken = localStorage.getItem("accessToken")
    const data = {
      email: email,
      accessToken: accessToken,
      birthDate: birthDate,
      sex: sex,
      bodyWeight: bodyWeight,
      heightInch: heightInch,
      waistCircumference: waistCircumference,
      hipCircumference: hipCircumference,
      interests: interests,
      ethnicity: ethnicity,
    }
    console.log("Submitted completion of profile:")
    console.log(data)
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/complete', data: data, method: 'POST' })
        .then(resp => {
          const message = resp.data.message;
          const status = resp.data.status;
          if (status !== "false") {
            commit('setHasCompletedProfile', { hasCompletedProfile: true })
            resolve({
              success: 1,
              message: message
            })
          } else {
            commit('setHasCompletedProfile', { hasCompletedProfile: false })
            resolve({
              success: 0,
              message: message
            })
          }
        })
        .catch(err => {
          commit('setHasCompletedProfile', { hasCompletedProfile: false })
          reject(err)
        })
    })
  },

  updateProfile({ state, commit }, { firstName, lastName, birthDate, sex, ethnicity, bodyWeight, heightInch, waistCircumference, hipCircumference, interests }) {
    const email = state.user.username
    const accessToken = localStorage.getItem("accessToken")
    const data = {
      email: email,
      accessToken: accessToken,
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
      sex: sex,
      bodyWeight: bodyWeight,
      heightInch: heightInch,
      waistCircumference: waistCircumference,
      hipCircumference: hipCircumference,
      interests: interests,
      ethnicity: ethnicity,
    }
    console.log("Submitted completion of profile:")
    console.log(data)
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/update-profile', data: data, method: 'POST' })
        .then(resp => {
          const message = resp.data.message;
          const status = resp.data.status;
          if (status !== "false") {
            commit('setUserProfile', {
              email,
              accessToken,
              firstName,
              lastName,
              birthDate,
              sex,
              bodyWeight,
              heightInch,
              waistCircumference,
              hipCircumference,
              interests,
              ethnicity,
            })
            resolve({
              success: 1,
              message: message
            })
          } else {
            resolve({
              success: 0,
              message: message
            })
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  confirm(context, accountID) {
    console.log(accountID)
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/confirm', method: 'GET', params: { UUID: accountID } })
        .then((resp) => {
          console.log(resp)
          const message = resp.data.message;
          const status = resp.data.status;
          if (status !== "false") {
            resolve({
              success: 1,
              message: message
            })
          } else {
            resolve({
              success: 0,
              message: message
            })
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getUser({ state }) {
    const email = state.user.username
    const accessToken = localStorage.getItem("accessToken")
    const payload = { accessToken, email }
    console.log("Get user payload:")
    console.log(payload)
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/user', data: payload, method: 'POST' })
        .then(resp => {
          console.log(resp)
          const message = resp.data.message
          const status = resp.data.status;
          const user = resp.data.user;
          if (status !== "false") {
            resolve({
              success: 1,
              message: message,
              user: user
            })
          } else {
            resolve({
              success: 0,
              message: message,
              user: user
            })
          }

        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getSurvey({ state }, { shortName }) {
    const email = state.user.username
    const accessToken = localStorage.getItem("accessToken")
    const payload = {
      email, accessToken, shortName
    }
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/getsurvey', data: payload, method: 'POST' })
        .then((response) => {
          const message = response.data.message
          const status = response.data.status
          if (status !== "false") {
            const survey = response.data.survey
            resolve({
              success: 1,
              message: message,
              survey: survey
            })
          } else {
            resolve({
              success: 0,
              message: message,
              survey: null
            })
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getCurrentLocationFromIP({ commit }) {
    return new Promise((resolve, reject) => {
      Axios({ url: 'http://ip-api.com/json', method: 'GET' })
        .then((response) => {
          var lat = response.data.lat;
          var lon = response.data.lon;
          var publicIP = response.data.query;
          var city = response.data.city;
          var region = response.data.region;
          commit('setLocation', { lat, lon, publicIP, city, region })
          resolve({
            lat: lat,
            lon: lon,
            publicIP: publicIP,
            city: city,
            region: region
          })
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  authorizeService({ state }, { serviceID }) {
    const email = state.user.username
    const accessToken = localStorage.getItem("accessToken")
    const payload = {
      email, accessToken, serviceID
    }
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/connect/authorize', data: payload, method: 'POST' })
        .then((response) => {
          const message = response.data.message
          const status = response.data.status
          if (status !== "false") {
            const url = response.data.url
            resolve({
              success: 1,
              message: message,
              url: url
            })
          } else {
            resolve({
              success: 0,
              message: message,
            })
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // method to get blog article html to be injected in page
  getArticle(context, { articleID }) {
    console.log("Loading blog articleID: " + articleID)
    return new Promise((resolve, reject) => {
      Axios({ url: ARTICLE_URL + "/" + articleID + ".html", method: 'GET' })
        .then((response) => {
          resolve({
            data: response.data
          })
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getAlphaLogs({ commit, state }, date) {
    const email = state.user.username
    const accessToken = localStorage.getItem("accessToken")
    const payload = {
      email, accessToken, date
    }
    console.log("getting logs")
    console.log(payload)
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/alpha/day', data: payload, method: 'POST' })
        .then((response) => {
          const status = response.data.status;
          if (status !== "false") {
            const logs = response.data.logs;
            console.log(logs)
            commit('setUserLogs', { logs })
            resolve({
              success: 1,
            })
          } else {
            resolve({
              success: 0,
            })
          }
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  },

  getAlphaTrackers({ commit, state }) {
    const email = state.user.username
    const accessToken = localStorage.getItem("accessToken")
    const payload = {
      email, accessToken
    }
    console.log("getting trackers")
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/alpha/trackers', data: payload, method: 'POST' })
        .then((response) => {
          const status = response.data.status;
          if (status !== "false") {
            const trackers = response.data.trackers;
            console.log(trackers)
            commit('setUserTrackers', { trackers })
            resolve({
              success: 1,
            })
          } else {
            resolve({
              success: 0,
            })
          }
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  },

  deleteAlphaLog({ state }, id) {
    const email = state.user.username
    const accessToken = localStorage.getItem("accessToken")
    const payload = {
      email, accessToken, id
    }
    console.log("Deleting log")
    console.log(payload)
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/alpha/note', data: payload, method: 'DELETE' })
        .then((response) => {
          const status = response.data.status;
          if (status !== "false") {
            resolve({
              success: 1,
            })
          } else {
            resolve({
              success: 0,
            })
          }
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  },

  patchAlphaLog({ commit, state }, date) {
    const email = state.user.username
    const accessToken = localStorage.getItem("accessToken")
    const payload = {
      email, accessToken, date
    }
    console.log("getting logs")
    console.log(payload)
    return new Promise((resolve, reject) => {
      Axios({ url: BASE_URL + '/alpha/note', data: payload, method: 'PATCH' })
        .then((response) => {
          const status = response.data.status;
          if (status !== "false") {
            const logs = response.data.logs;
            console.log(logs)
            commit('setUserLogs', { logs })
            resolve({
              success: 1,
            })
          } else {
            resolve({
              success: 0,
            })
          }
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  },

}

// https://vuex.vuejs.org/guide/mutations.html#mutations-must-be-synchronous
// mutations are synchronous functions that modify client state
const mutations = {
  auth_request(state) {
    state.status = 'loading'
  },
  auth_success(state, { refreshToken, expirationTime, role, institutions, groups, username, firstName, lastName, hasCompletedTwoFactor, hasCompletedProfile, hasSetPassword }) {
    state.status = 'success'
    state.refreshToken = refreshToken
    state.expirationTime = expirationTime
    state.user = {}
    state.user.role = role
    state.user.institutions = institutions
    state.user.groups = groups
    state.user.username = username
    state.user.firstName = firstName
    state.user.lastName = lastName
    state.user.hasCompletedTwoFactor = hasCompletedTwoFactor
    state.user.hasCompletedProfile = hasCompletedProfile
    state.user.hasSetPassword = hasSetPassword
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
    console.log("RUNNING logoutUser")
    state.refreshToken = ''
    state.status = ''
    state.expirationTime = 0
    state.accessToken = ''
    state.user = {
      firstName: null,
      lastName: null,
    }
  },
  setLocation(state, { lat, lon, publicIP, city, region }) {
    state.lat = lat
    state.lon = lon
    state.publicIP = publicIP
    state.city = city
    state.region = region
  },
  setHasCompletedProfile(state, { hasCompletedProfile }) {
    state.user.hasCompletedProfile = hasCompletedProfile
  },
  setHasCompletedTwoFactor(state, { hasCompletedTwoFactor }) {
    console.log("Setting has completed two factor: " + hasCompletedTwoFactor)
    state.user.hasCompletedTwoFactor = hasCompletedTwoFactor;
  },
  setHasSetPassword(state, { hasSetPassword }) {
    console.log("Setting has set password: " + hasSetPassword)
    state.user.hasSetPassword = hasSetPassword;
  },
  setUserProfile(state, { firstName, lastName, birthDate, sex, ethnicity, bodyWeight, heightInch, waistCircumference, hipCircumference, interests }) {
    state.user.firstName = firstName
    state.user.lastName = lastName
    state.user.birthDate = birthDate
    state.user.sex = sex
    state.user.ethnicity = ethnicity
    state.user.bodyWeight = bodyWeight
    state.user.heightInch = heightInch
    state.user.waistCircumference = waistCircumference
    state.user.hipCircumference = hipCircumference
    state.user.interests = interests
  },
  setUserTiles(state, { tiles }) {
    state.user.tiles = tiles;
  },
  setUserLogs(state, { logs }) {
    console.log("Updating current day user logs...")
    state.user.currentDayLogs = logs
  },
  setUserTrackers(state, { trackers }) {
    console.log("Updating user trackers...")
    state.user.trackers = trackers
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

