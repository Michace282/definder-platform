import { PostApiRequest } from '~/pkg/api/base'

export class AddOrUpdateUserTrustWallet extends PostApiRequest {
  constructor(ctx, data) {
    const body = {
      name: data.name,
    }

    const url = '/wallets/add-or-update-user-trustwallet/'
    super(ctx, url, body)
  }
}
