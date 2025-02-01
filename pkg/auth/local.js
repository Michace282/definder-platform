import { Oauth2Scheme } from '@nuxtjs/auth-next/dist/runtime'

export default class CustomLocalScheme extends Oauth2Scheme {
  async mounted() {
    const token = this.token.get()
    if (!token) {
      return
    }

    try {
      const userData = await this.$auth.ctx.$api.profile.getProfile()
      this.$auth.setUser(userData)
    } catch (e) {
      console.error(e)
    }
  }

  async login(data) {
    const { accessToken, refreshToken, user } =
      await this.$auth.ctx.$api.auth.loginUser(data)

    this.setUserToken(accessToken, refreshToken)

    this.$auth.setUser(user)
    return user
  }

  async logout() {
    const refresh = this.refreshToken.get()
    try {
      await this.$auth.ctx.$api.auth.logoutUserWithoutRefresh({ refresh })
    } catch (e) {}
    return this.$auth.reset()
  }

  async refreshTokens() {
    const refresh = this.refreshToken.get()
    if (!refresh) {
      this.$auth.reset()
      return
    }

    const { access } = await this.$auth.ctx.$api.auth.refreshToken({
      refresh,
    })
    this.setUserToken(access, refresh)

    const userData =
      await this.$auth.ctx.$api.profile.getProfileWithoutRefresh()

    this.$auth.setUser(userData)
  }

  setUserToken(access, refresh) {
    this.token.set(access)
    this.refreshToken.set(refresh)
  }

  async fetchUser() {
    const token = this.token.get()
    if (!token) {
      return
    }

    try {
      const userData = await this.$auth.ctx.$api.profile.getProfile()
      this.$auth.setUser(userData)
    } catch (e) {
      console.error(e)
    }
  }
}
