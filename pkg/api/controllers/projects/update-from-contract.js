import { PostApiRequest } from '~/pkg/api/base'

export class UpdateFromContract extends PostApiRequest {
  constructor(context, id) {
    const url = `/projects/${id}/update_from_contract/`
    super(context, url, {})
  }
}
