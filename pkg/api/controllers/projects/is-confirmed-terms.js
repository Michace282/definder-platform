import { GetApiRequest } from '~/pkg/api/base'

export class IsConfirmedTerms extends GetApiRequest {
  constructor(context, data = {}) {
    const projectId = data.id
    const url = `/projects/${projectId}/is-confirmed-terms/`

    super(context, url)
  }
}
