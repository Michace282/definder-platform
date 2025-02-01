import { BaseApiFactory } from '~/pkg/api/base'

export class ApiFactory extends BaseApiFactory {
  constructor(context) {
    const axios = context.$axios.create({
      baseURL: context.env.API_URL,
    })

    super(context, axios)
  }
}
