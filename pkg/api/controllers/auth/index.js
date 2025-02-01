import { ApiFactory } from '~/pkg/api/api-factory'
import { LoginUser } from '~/pkg/api/controllers/auth/login-user'
import { LogoutUser } from '~/pkg/api/controllers/auth/logout'
import { LogoutUserWithoutRefresh } from '~/pkg/api/controllers/auth/logout-without-refresh'
import { RefreshToken } from '~/pkg/api/controllers/auth/refresh-token'
import { ResetPassword } from '~/pkg/api/controllers/auth/reset-password'
import { ResetPasswordConfirm } from '~/pkg/api/controllers/auth/reset-password-confirm'

export class AuthController extends ApiFactory {
  async loginUser(data) {
    const request = new LoginUser(this.context, data)
    return await request.fetch(this.axios)
  }

  async logoutUser(data) {
    const request = new LogoutUser(this.context, data)
    return await request.fetch(this.axios)
  }

  async logoutUserWithoutRefresh(data) {
    const request = new LogoutUserWithoutRefresh(this.context, data)
    return await request.fetch(this.axios)
  }

  async refreshToken(data) {
    const request = new RefreshToken(this.context, data)
    return await request.fetch(this.axios)
  }

  async resetPassword(data) {
    const request = new ResetPassword(this.context, data)
    return await request.fetch(this.axios)
  }

  async resetPasswordConfirm(data) {
    const request = new ResetPasswordConfirm(this.context, data)
    return await request.fetch(this.axios)
  }
}
