import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import app from './modules/app';
import user from './modules/user';
import lang from './modules/lang';
import createPersistedState from "vuex-persistedstate"
export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
  },
  getters: {
    sidebar: state => state.app.sidebar,
    account: state => state.user.account,
    username: state => state.user.username,
    type: state => state.user.type,
    token: state => state.user.token,
    locale: state => state.lang.locale
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    app,user,lang
  }
})
