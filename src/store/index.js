import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Taidinh' },
    categories: Array.from({ length: 5 }, () => `${Math.floor(Math.random() * 50)} test`)
  },
  getters: {
    catLength(state) {
      return state.categories.length
    },
    catLengthGetter(state, getters) {
      return state.categories.length + getters.catLength
    },
    dynamicParams: state => id => {
      return state.categories[id]
    }
  },
  mutations: {},
  actions: {},
  modules: {},
});
