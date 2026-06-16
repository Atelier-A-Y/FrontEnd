import api from '../api/api'

export async function getProfile() {
  const response = await api.get('/usuarios/me/')
  return response.data
}

export async function updateProfile(data: any) {
  const response = await api.patch('/usuarios/me/', data)
  return response.data
}
