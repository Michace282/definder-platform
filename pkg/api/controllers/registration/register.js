import { PostApiRequest } from '~/pkg/api/base'

export class Register extends PostApiRequest {
  constructor(context, data = {}) {
    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      // phone: data.phone,
      telegram: data.telegram,
      password: data.password,
      confirmPassword: data.confirmPassword,
      receiveNotifications: data.receiveNotifications,
      referrer: data.referrer,
    }

    const url = '/registration/register/'
    super(context, url, body)
  }
}
