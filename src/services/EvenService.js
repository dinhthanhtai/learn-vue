import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  // GET /events?_page=1&_per_page=25
  getEvents(perPage, page) {
    return apiClient.get(`/events?_per_page=${perPage}&_page=${page}`)
    // return apiClient.get(`/events`)
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event);
  }

}