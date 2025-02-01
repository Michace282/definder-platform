import { PostApiRequest } from '~/pkg/api/base'

export class GetGasData extends PostApiRequest {
  constructor(ctx, data) {
    const body = {
      transactionFrom: data.transactionFrom,
      transactionTo: data.transactionTo,
      value: data.value,
    }

    const url = `/wallets/get-gas-data/`
    super(ctx, url, body)
  }
}
