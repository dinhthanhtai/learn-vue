export const namespaced = true;

export const state = {
  notifications: []
}

let nextId = 1;

export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId++
    })
  },
  DELETE(state, notificationId) {
    state.notifications = state.notifications.filter(notice => notice.id !== notificationId)
  }
}

export const actions = {
  add({ commit }, notification) {
    commit('PUSH', notification)
  },

  remove({ commit }, notificationId) {
    commit('DELETE', notificationId)
  }
}

export const onAddNotification = (type, message, dispatch) => {
  const notification = {
    type,
    message
  }

  dispatch('notification/add', notification, { root: true })
}

export const EventType = {
  success: 'success',
  error: 'error'
}