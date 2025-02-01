import { PutApiRequest } from '~/pkg/api/base'

export class UpdateAccountById extends PutApiRequest {
  constructor(context, data) {
    const id = data.id
    const metamaskWallet = { name: data.metamaskWallet || '' }

    const body = new FormData()
    body.append('coinWallets', JSON.stringify(data.coinWallets))
    body.append('firstName', data.firstName)
    body.append('email', data.email)
    body.append('phone', data.phone)
    body.append('telegram', data.telegram)
    body.append('receiveNotifications', data.receiveNotifications)
    body.append('metamaskWallet', JSON.stringify(metamaskWallet))

    if (data.lastName !== undefined && data.lastName !== null) {
      body.append('lastName', data.lastName)
    }
    if (data.avatar !== undefined) {
      if (data.avatar === null) {
        body.append('avatar', '')
      } else {
        body.append('avatar', data.avatar)
      }
    }

    const url = `/profile/account/${id}/`
    super(context, url, body)
  }
}
