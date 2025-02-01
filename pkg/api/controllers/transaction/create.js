import { PostApiRequest } from '~/pkg/api/base'

export class Create extends PostApiRequest {
  constructor(ctx, data) {
    const body = {
      type: data.type,
      project: data.project,
      link: data.link,
      amount: data.amount,
    }

    const url = '/transactions/'
    super(ctx, url, body)
  }
}
