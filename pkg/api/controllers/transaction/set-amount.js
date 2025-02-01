import { PostApiRequest } from '~/pkg/api/base'

export class SetAmount extends PostApiRequest {
  constructor(ctx, data) {
    const body = {
      project: data.project,
      amount: data.amount,
    }

    const id = data.project

    const url = `/transactions/${id}/set-future-investment-amount/`
    super(ctx, url, body)
  }
}
