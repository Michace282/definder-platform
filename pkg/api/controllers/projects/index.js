import { ApiFactory } from '~/pkg/api/api-factory'
import { AddWallets } from '~/pkg/api/controllers/projects/add-wallets'
import { GetProjects } from '~/pkg/api/controllers/projects/get-projects'
import { GetById } from '~/pkg/api/controllers/projects/get-by-id'
import { CreateProject } from '~/pkg/api/controllers/projects/create-ptoject'
import { ConfirmTerms } from '~/pkg/api/controllers/projects/confirm-terms'
import { IsConfirmedTerms } from '~/pkg/api/controllers/projects/is-confirmed-terms'
import { GetUserProjectList } from '~/pkg/api/controllers/projects/get-user-project-list'
import { Vote } from '~/pkg/api/controllers/projects/vote'
import { MultisigProjects } from '~/pkg/api/controllers/projects/multisig-projects'
import { UpdateFromContract } from '~/pkg/api/controllers/projects/update-from-contract'

export class ProjectsController extends ApiFactory {
  constructor(context, { fileConvertor }) {
    super(context)

    this.fileConvertor = fileConvertor
  }

  async vote(data) {
    const request = new Vote(this.context, data)
    return await request.fetch(this.axios)
  }

  async multisigProjects(address) {
    const request = new MultisigProjects(this.context, address)
    return await request.fetch(this.axios)
  }

  async updateFromContract(id) {
    const request = new UpdateFromContract(this.context, id)
    return await request.fetch(this.axios)
  }

  async addWallets(data) {
    const request = new AddWallets(this.context, data)
    return await request.fetch(this.axios)
  }

  async getProjects(data) {
    const request = new GetProjects(this.context, data)
    return await request.fetch(this.axios)
  }

  async getById(data) {
    const request = new GetById(this.context, data)
    return await request.fetch(this.axios)
  }

  async createProject(data) {
    const request = new CreateProject(this.context, data, {
      fileConvertor: this.fileConvertor,
    })
    await request.formatFiles()
    return await request.fetch(this.axios)
  }

  async confirmTerms(data) {
    const request = new ConfirmTerms(this.context, data)
    return await request.fetch(this.axios)
  }

  async isConfirmedTerms(data) {
    const request = new IsConfirmedTerms(this.context, data)
    return await request.fetch(this.axios)
  }

  async getUserProjectList(data) {
    const request = new GetUserProjectList(this.context, data)
    return await request.fetch(this.axios)
  }
}
