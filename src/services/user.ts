import api from '../api/api'

export async function getProfile() {
  const response = await api.get('/me/')
  return response.data
}

export async function updateProfile(data: any) {
  const response = await api.patch('/me/', data)
  return response.data
}
