import { PostApiRequest } from '~/pkg/api/base'

export class AddOrUpdateUserMetamaskWallet extends PostApiRequest {
  constructor(ctx, data) {
    const body = {
      name: data.name,
      // currency: data.currency,
    }

    const url = '/wallets/add-or-update-user-metamask-wallet/'
    super(ctx, url, body)
  }
}
