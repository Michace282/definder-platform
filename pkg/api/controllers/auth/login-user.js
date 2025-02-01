import { PostApiRequest } from '~/pkg/api/base'

export class LoginUser extends PostApiRequest {
  constructor(context, data = {}) {
    const body = {
      email: data.email,
      password: data.password,
    }

    const url = '/auth/user/login/'
    super(context, url, body)
  }
}
