import { PostApiRequest } from '~/pkg/api/base'

export class ResetPasswordConfirm extends PostApiRequest {
  constructor(context, data = {}) {
    const body = {
      newPassword1: data.newPassword1,
      newPassword2: data.newPassword2,
      uid: data.uid,
      token: data.token,
    }

    const url = '/auth/password/reset/confirm/'
    super(context, url, body)
  }
}
