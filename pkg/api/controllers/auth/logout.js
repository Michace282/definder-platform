import { PostApiRequest } from '~/pkg/api/base'

export class LogoutUser extends PostApiRequest {
  constructor(context, data = {}) {
    const body = {
      refresh: data.refresh,
    }

    const url = '/auth/logout/'
    super(context, url, body)
  }
}
