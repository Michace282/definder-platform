import { PostApiRequest } from '~/pkg/api/base'

export class MultisigProjects extends PostApiRequest {
  constructor(context, address) {
    const url = `/projects/projects_for_multisig_address/?address=` + address
    super(context, url, {})
  }
}
