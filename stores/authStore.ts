type User = {
  id?: number,
  name: string,
  username: string,
  active_status: boolean,
  user_code: string,
  user_group_id: number,
}

type Credentials = {
  username: string,
  password: string,
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || '{}'),
    user_token: JSON.parse(localStorage.getItem('user_token') || 'null'),
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn') || 'false')
  }),

  getters: {
    // isLoggedIn: (state) => {
    // return !state.user ? false : true
    // }
  },

  actions: {
    async fetchUser() {
      const { data, error } = await useApiFetch('users/me');
      this.save('user', data.value)
    },

    async login(credentials: Credentials) {
      await useFetch(`${useRuntimeConfig().public.baseRootURL}sanctum/csrf-cookie`)
      const response = await useApiFetch('auth/login', {
        method: 'POST',
        body: credentials,
      })

      if (response.data) {
        // this.user_token = response.data.value.token
        this.save('user_token', response.data.value.token)

        // this.user = response.data.value.user
        this.save('user', response.data.value.user)

        // this.isLoggedIn = true
        this.save('isLoggedIn', true)
        console.log(this.user)

        await this.fetchUser()
        return response
      }
    },

    async logout() {
      await useApiFetch('auth/logout', { method: 'POST' })
      this.save('user', null)
      this.save('user_token', null)
      this.save('isLoggedIn', false)
      navigateTo('/')
    },

    save(persistType: any, value: any) {
      this[persistType] = value
      localStorage.setItem(persistType, JSON.stringify(value))
    }
  }
})
