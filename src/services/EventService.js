import axios from 'axios'
import NProgress from 'nprogress'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

apiClient.interceptors.request.use(config => {
  NProgress.start();

  return config;
});

apiClient.interceptors.response.use(response => {

  setTimeout(() => NProgress.done(), 5500);


  return response
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