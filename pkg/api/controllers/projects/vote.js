import { PostApiRequest } from '~/pkg/api/base'

export class Vote extends PostApiRequest {
  constructor(context, data = {}) {
    const id = data.id
    const body = data

    const url = `/projects/${id}/vote/`
    super(context, url, body)
  }
}
