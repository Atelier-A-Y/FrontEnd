import axios from 'axios'

const api = axios.create({
  //baseURL: 'https://backend-atelier-a-y.class.fabricadesoftware.ifc.edu.br/api'
  baseURL: 'http://127.0.0.1:8000/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
