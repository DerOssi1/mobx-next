import axios from 'axios'
import { initializeStore } from '@/stores'
import * as auth from '@/utils/auth'

const isServer = typeof window === 'undefined'
export const baseURL = ''

export const api = axios.create({
  baseURL
})


api.interceptors.request.use( config => {
  // console.log(config)
  // // Do something before request is sent
  const store = initializeStore()
  config.headers['Authorization'] = `Bearer ${store.user.token}`
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

api.interceptors.response.use( response => {
  // Do something with response data
  return response
}, (error) => {
  if (error.response && error.response.status) {
    // return error.response.data
    switch (error.response.status) {
      case 400:
        break;
      case 401: // token invalid
        auth.logout()
        break;
      default:
        break;
    }
  }
  // Do something with response error
  return Promise.reject(error)
})

export default api

export const login = data => api.post(`/api/login`, data)