import { PostApiRequest } from '~/pkg/api/base'

export class RefreshToken extends PostApiRequest {
  constructor(context, data = {}) {
    const body = {
      refresh: data.refresh,
    }

    const url = '/auth/token/refresh/'
    super(context, url, body)
  }

  async handleErrors(e) {
    await this.app.$auth.logout()
    throw e
  }
}
