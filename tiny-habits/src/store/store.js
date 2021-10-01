import Vue from 'vue';
import Vuex from 'vuex';
import user from '@/store/modules/patient/user.js';
import VuexPersist from 'vuex-persist';

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
    key: 'vuex', // The key to store the state on in the storage provider.
    storage: window.localStorage, // or window.sessionStorage or localForage
    // Function that passes the state and returns the state with only the objects you want to store.
    reducer: state => ({
      patient: state.patient
    }),
  })
  
  // Create store 
  export default new Vuex.Store({
    modules: {
      user,
    },
    plugins: [vuexLocalStorage.plugin]
  });
  