import { PostApiRequest } from '~/pkg/api/base'

export class ResendVerificationEmail extends PostApiRequest {
  constructor(context, data = {}) {
    const body = {
      email: data.email,
    }

    const url = '/registration/resend-confirmation-email/'
    super(context, url, body)
  }
}
