import { GetProfile } from '~/pkg/api/controllers/profile/account'

export class GetProfileWithoutRefresh extends GetProfile {
  async handleErrors(error) {
    await this.app.$auth.logout()
    throw error
  }
}
