import { ApiFactory } from '~/pkg/api/api-factory'
import { GetProfile } from '~/pkg/api/controllers/profile/account'
import { GetProfileWithoutRefresh } from '~/pkg/api/controllers/profile/account-without-refresh'
import { UpdateAccountById } from '~/pkg/api/controllers/profile/update-account-by-id'
import { ChangePassword } from '~/pkg/api/controllers/profile/change-password'

export class ProfileController extends ApiFactory {
  async getProfile() {
    const request = new GetProfile(this.context)
    return await request.fetch(this.axios)
  }

  async getProfileWithoutRefresh() {
    const request = new GetProfileWithoutRefresh(this.context)
    return await request.fetch(this.axios)
  }

  async updateAccountById(data) {
    const request = new UpdateAccountById(this.context, data)
    return await request.fetch(this.axios)
  }

  async changePassword(data) {
    const request = new ChangePassword(this.context, data)
    return await request.fetch(this.axios)
  }
}
