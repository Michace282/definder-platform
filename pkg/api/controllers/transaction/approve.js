import { PostApiRequest } from '~/pkg/api/base'

export class Approve extends PostApiRequest {
  constructor(ctx, data) {
    const id = data.id
    const body = {
      amount: data.amount,
    }

    const url = `/transactions/${id}/approve/`
    super(ctx, url, body)
  }
}
