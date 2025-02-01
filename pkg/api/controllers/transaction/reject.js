import { PostApiRequest } from '~/pkg/api/base'

export class Reject extends PostApiRequest {
  constructor(ctx, data) {
    const id = data.id
    const optionalParameters = ['comment']

    const body = {}
    for (const param of optionalParameters) {
      const value = data[param]
      if (Reject.isParameterValid(value)) {
        body[param] = value
      }
    }

    const url = `/transactions/${id}/reject/`
    super(ctx, url, body)
  }

  static isParameterValid(param) {
    return param !== null && param !== undefined && param !== ''
  }
}
