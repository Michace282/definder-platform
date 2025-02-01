import { GetApiRequest } from '~/pkg/api/base'

export class GetAll extends GetApiRequest {
  constructor(ctx, data) {
    const optionalParameters = [
      'client',
      'clientEmail',
      'page',
      'pageSize',
      'project',
      'transactionType',
    ]

    const body = {}
    for (const param of optionalParameters) {
      const value = data[param]
      if (GetAll.isParameterValid(value)) {
        body[param] = value
      }
    }

    const url = '/transactions/'
    super(ctx, url, body)
  }

  static isParameterValid(param) {
    return param !== null && param !== undefined && param !== ''
  }
}
