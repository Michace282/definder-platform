import { FileConvertor } from '~/pkg/file/FileConvertor'

import { AuthController } from '~/pkg/api/controllers/auth'
import { RegistrationController } from '~/pkg/api/controllers/registration'
import { ProfileController } from '~/pkg/api/controllers/profile'
import { ProjectsController } from '~/pkg/api/controllers/projects'
import { TransactionController } from '~/pkg/api/controllers/transaction'
import { WalletsController } from '~/pkg/api/controllers/wallets'

export default class Api {
  constructor(context) {
    const fileConvertor = new FileConvertor()

    this.auth = new AuthController(context)
    this.registration = new RegistrationController(context)
    this.profile = new ProfileController(context)
    this.projects = new ProjectsController(context, { fileConvertor })
    this.transaction = new TransactionController(context)
    this.wallets = new WalletsController(context)
  }
}
