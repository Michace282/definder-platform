import { PostApiRequest } from '~/pkg/api/base'

export class VerifyEmail extends PostApiRequest {
  constructor(context, data = {}) {
    const body = {
      key: data.key,
    }

    const url = '/registration/verify-email/'
    super(context, url, body)
  }
}
