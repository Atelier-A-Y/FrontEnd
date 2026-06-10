import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null)

  const token = ref(
    localStorage.getItem('token')
  )

  function setUser(data: any) {
    user.value = data
  }

  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function logout() {
    user.value = null
    token.value = null

    localStorage.removeItem('token')
  }

  return {
    user,
    token,
    setUser,
    setToken,
    logout
  }
})
