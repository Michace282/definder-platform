import { PostApiRequest } from '~/pkg/api/base'

export class ConfirmTerms extends PostApiRequest {
  constructor(context, data = {}) {
    const body = { confirmed: true }

    const projectId = data.id
    const url = `/projects/${projectId}/confirm-terms/`

    super(context, url, body)
  }
}
