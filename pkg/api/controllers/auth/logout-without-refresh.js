import { LogoutUser } from '~/pkg/api/controllers/auth/logout'

export class LogoutUserWithoutRefresh extends LogoutUser {
  handleErrors(error) {
    throw error
  }
}
