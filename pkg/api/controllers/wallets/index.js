import { ApiFactory } from '~/pkg/api/api-factory'
import { GetCurrencies } from '~/pkg/api/controllers/wallets/get-currencies'
import { GetCurrentExchangeRate } from '~/pkg/api/controllers/wallets/get-current-exchange-rate'
import { AddOrUpdateUserMetamaskWallet } from '~/pkg/api/controllers/wallets/add-or-update-user-metamask-wallet'
import { AddOrUpdateUserTrustWallet } from '~/pkg/api/controllers/wallets/add-or-update-user-trust-wallet'
import { GetGasData } from '~/pkg/api/controllers/wallets/get-gas-data'

export class WalletsController extends ApiFactory {
  async getCurrencies() {
    const request = new GetCurrencies(this.context)
    return await request.fetch(this.axios)
  }

  async getCurrentExchangeRate() {
    const request = new GetCurrentExchangeRate(this.context)
    return await request.fetch(this.axios)
  }

  async addOrUpdateUserMetamaskWallet(data) {
    const request = new AddOrUpdateUserMetamaskWallet(this.context, data)
    return await request.fetch(this.axios)
  }

  async addOrUpdateUserTrustWallet(data) {
    const request = new AddOrUpdateUserTrustWallet(this.context, data)
    return await request.fetch(this.axios)
  }

  async getGasData(data) {
    const request = new GetGasData(this.context, data)
    return await request.fetch(this.axios)
  }
}
