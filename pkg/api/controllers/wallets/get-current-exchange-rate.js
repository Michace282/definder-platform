import { GetApiRequest } from '~/pkg/api/base'

export class GetCurrentExchangeRate extends GetApiRequest {
  constructor(context) {
    const url = '/wallets/get-current-exchange-rate/'
    super(context, url)
  }
}
