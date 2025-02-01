import { GetApiRequest } from '~/pkg/api/base'

export class GetCurrencies extends GetApiRequest {
  constructor(context) {
    const url = '/wallets/currencies/'
    super(context, url)
  }
}
