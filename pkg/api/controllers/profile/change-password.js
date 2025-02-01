import { PostApiRequest } from '~/pkg/api/base'

export class ChangePassword extends PostApiRequest {
  constructor(context, data) {
    const body = {
      oldpassword: data.oldPassword,
      password1: data.newPassword,
      password2: data.repeatNewPassword,
    }

    const url = `/profile/password/change/`
    super(context, url, body)
  }
}
