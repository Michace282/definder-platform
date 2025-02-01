import { PostApiRequest } from '~/pkg/api/base'

export class ResetPassword extends PostApiRequest {
  constructor(context, data = {}) {
    const body = {
      email: data.email,
    }

    const url = '/auth/password/reset/'
    super(context, url, body)
  }
}
