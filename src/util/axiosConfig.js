import Axios from 'axios'

// This is the base URL where requests comes from
const axios = Axios.create({
    baseURL: 'http://localhost:8000',
    proxyHeaders: false,
    credentials: false,
    timeout: 90000
  })

  axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token')

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )


  export default axios
