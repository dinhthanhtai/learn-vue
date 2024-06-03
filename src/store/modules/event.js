import EventService from "@/services/EvenService";

export const namespaced = true;

export const state = {
  events: [],
  totalPages: 0,
  event: {},
}

export const getters = {
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
}

export const mutations = {
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
}

export const actions = {
  createEvent(props, event) {
    const { commit, rootState } = props;
    console.log('User creating Event is ' + rootState.user.user.name);
    return EventService.postEvent(event).then(() => {
      commit('ADD_EVENT', event)
      return event;
    });
  },
  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page).then(response => {
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
}