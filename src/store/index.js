import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EvenService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Taidinh' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [],
    totalPages: 0,
    event: {},
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
    },
    getEvent: state => id => {
      return state.events.find(event => event.id == id);
    }
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_TOTALPAGES(state, totalPages) {
      state.totalPages = totalPages
    },
    SET_EVENT(state, event) {
      state.event = event;
    }
  },
  actions: {
    createEvent(props, event) {
      const { commit } = props
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
        return event;
      });
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page).then(response => {
        console.log(response)
        commit('SET_TOTALPAGES', response.data.items)
        commit('SET_EVENTS', response.data.data)
      }).catch(error => {
        console.log('There was an error' + error.response)
      })
    },
    fetchEvent({ commit, getters }, id) {
      const event = getters.getEvent(id);
      if (event) {
        commit('SET_EVENT', event);
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            console.log('There was an error:', error.response)
          })
      }
    }
  },
  modules: {},
});
