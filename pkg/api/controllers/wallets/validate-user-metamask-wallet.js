import { PostApiRequest } from '~/pkg/api/base'

export class ValidateUserMetamaskWallet extends PostApiRequest {
  constructor(ctx, data) {
    const name = data.name

    const body = new FormData()
    body.append('signature', data.signature)

    const url = `/wallets/validate-user-metamask-wallet/${name}/`
    super(ctx, url, body)
  }
}
