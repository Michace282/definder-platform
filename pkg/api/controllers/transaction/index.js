import { ApiFactory } from '~/pkg/api/api-factory'
import { GetAll } from '~/pkg/api/controllers/transaction/get-all'
import { Create } from '~/pkg/api/controllers/transaction/create'
import { SetAmount } from '~/pkg/api/controllers/transaction/set-amount'
import { Approve } from '~/pkg/api/controllers/transaction/approve'
import { Reject } from '~/pkg/api/controllers/transaction/reject'
import { GetReserved } from '~/pkg/api/controllers/transaction/get-reserved'
import { GetFinancing } from '~/pkg/api/controllers/transaction/get-financing'

export class TransactionController extends ApiFactory {
  async getAll(data) {
    const request = new GetAll(this.context, data)
    return await request.fetch(this.axios)
  }

  async create(data) {
    const request = new Create(this.context, data)
    return await request.fetch(this.axios)
  }

  async setAmount(data) {
    const request = new SetAmount(this.context, data)
    return await request.fetch(this.axios)
  }

  async approve(data) {
    const request = new Approve(this.context, data)
    return await request.fetch(this.axios)
  }

  async reject(data) {
    const request = new Reject(this.context, data)
    return await request.fetch(this.axios)
  }

  async getReserved(data) {
    const request = new GetReserved(this.context, data)
    return await request.fetch(this.axios)
  }

  async getFinancing(data) {
    const request = new GetFinancing(this.context, data)
    return await request.fetch(this.axios)
  }
}
