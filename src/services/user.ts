import api from '../api/api'

export async function getProfile() {
  const response = await api.get('/usuarios/me/')
  return response.data
}

export async function updateProfile(data: any) {
  const response = await api.patch('/usuarios/me/', data)
  return response.data
}

export async function changePassword(data: {
  current_password: string
  new_password: string
}) {
  const response = await api.post(
    '/usuarios/change_password/',
    data
  )

  return response.data
}
