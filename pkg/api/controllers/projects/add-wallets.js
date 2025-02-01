import { PostApiRequest } from '~/pkg/api/base'

export class AddWallets extends PostApiRequest {
  constructor(context, data = {}) {
    const id = data.id
    const body = {
      coinWallets: data.coinWallets,
    }

    const url = `/projects/${id}/add-wallets/`
    super(context, url, body)
  }
}
